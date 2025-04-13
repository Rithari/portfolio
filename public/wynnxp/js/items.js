// Cache management
function getFromCache() {
    const cachedData = localStorage.getItem('itemsData');
    if (!cachedData) return null;
    
    try {
        const { timestamp, items } = JSON.parse(cachedData);
        const now = Date.now();
        if (now - timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('itemsData');
            return null;
        }
        return items;
    } catch (e) {
        console.error('Error parsing cache:', e);
        localStorage.removeItem('itemsData');
        return null;
    }
}

function saveToCache(items) {
    const cacheData = {
        timestamp: Date.now(),
        items: items
    };
    localStorage.setItem('itemsData', JSON.stringify(cacheData));
}

function getTierColor(tier) {
    const colors = {
        'NORMAL': 'var(--foreground)', // Default color (white in dark theme)
        'UNIQUE': '#FFFF55', // Bright yellow
        'RARE': '#F852F7', // Deep purple
        'LEGENDARY': '#03FFFF', // Cyan
        'MYTHIC': '#AA01AA', // Bright magenta
        'FABLED': '#FF5655', // Bright red
        'SET': '#2A9017' // Bright green - for items with rarity attribute 'set'
    };
    
    // Handle null, undefined, or non-string tier values
    if (!tier || typeof tier !== 'string') {
        return colors.NORMAL;
    }
    
    return colors[tier.toUpperCase()] || colors.NORMAL;
}

function getCategoryDisplayName(category) {
    const displayNames = {
        // Weapons
        'wand': 'Wand',
        'bow': 'Bow',
        'dagger': 'Dagger',
        'spear': 'Spear',
        'relik': 'Relik',
        // Armor
        'helmet': 'Helmet',
        'chestplate': 'Chestplate',
        'leggings': 'Leggings',
        'boots': 'Boots',
        // Accessories
        'ring': 'Ring',
        'bracelet': 'Bracelet',
        'necklace': 'Necklace',
        // Other
        'weapon': 'Weapon',
        'armour': 'Armour',
        'accessory': 'Accessory',
        'unknown weapon': 'Unknown Weapon',
        'unknown armor': 'Unknown Armor',
        'unknown accessory': 'Unknown Accessory',
        'unknown': 'Unknown'
    };
    
    return displayNames[category.toLowerCase()] || 
           category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function filterEfficientItems(items, category) {
    // Don't filter ingredients
    if (category.toLowerCase() === 'ingredient') {
        return items.map(item => ({ ...item, isCompetitive: true }));
    }

    // Keep track of the highest XP bonus seen at each level and below
    let maxXPByLevel = [];
    
    // First pass: find maximum XP values
    items.forEach(item => {
        const level = item.level;
        const xpBonus = item.xpBonus;
        const maxPossibleXP = xpBonus.max || xpBonus.raw || 0;
        const guaranteedXP = xpBonus.min || xpBonus.raw || 0;
        
        if (!maxXPByLevel[level] || guaranteedXP > maxXPByLevel[level]) {
            maxXPByLevel[level] = guaranteedXP;
        }
    });

    // Second pass: mark items as competitive or not
    return items.map(item => {
        const level = item.level;
        const xpBonus = item.xpBonus;
        const maxPossibleXP = xpBonus.max || xpBonus.raw || 0;
        
        // Check if there's a lower or equal level item that always gives more XP
        let isCompetitive = true;
        for (let i = 0; i <= level; i++) {
            if (maxXPByLevel[i] && maxXPByLevel[i] > maxPossibleXP) {
                isCompetitive = false;
                break;
            }
        }
        
        return { ...item, isCompetitive };
    });
}

function getCategoryOrder(category) {
    const orderMap = {
        // Armor pieces (1-10)
        'helmet': 1,
        'chestplate': 2,
        'leggings': 3,
        'boots': 4,
        // Accessories (11-20)
        'ring': 11,
        'necklace': 12,
        'bracelet': 13,
        // Weapons (21-30)
        'bow': 21,
        'dagger': 22,
        'relik': 23,
        'spear': 24,
        'wand': 25,
        // Other categories (31+)
        'ingredient': 31,
        'unknown': 100
    };
    
    return orderMap[category.toLowerCase()] || 50;
}

function updateUI(categories) {
    // Update section HTML for each category we've defined in HTML
    updateCategorySection('helmet-section', categories['helmet'] || []);
    updateCategorySection('chestplate-section', categories['chestplate'] || []);
    updateCategorySection('leggings-section', categories['leggings'] || []);
    updateCategorySection('boots-section', categories['boots'] || []);

    // Add any other categories dynamically
    const existingCategories = ['helmet', 'chestplate', 'leggings', 'boots'];
    const otherCategories = Object.entries(categories)
        .filter(([category]) => !existingCategories.includes(category.toLowerCase()))
        .sort(([a], [b]) => {
            const orderA = getCategoryOrder(a);
            const orderB = getCategoryOrder(b);
            if (orderA === orderB) {
                return a.localeCompare(b);
            }
            return orderA - orderB;
        });

    // Add other categories if they exist
    if (otherCategories.length > 0) {
        const itemsContainer = document.getElementById('items');
        
        otherCategories.forEach(([category, items]) => {
            const categoryId = `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-section`;
            
            // Check if this section already exists
            if (document.getElementById(categoryId)) {
                updateCategorySection(categoryId, items);
                return;
            }
            
            // Create new section
            const sectionHTML = `
                <div id="${categoryId}" class="card category-card">
                    <div class="card-header" onclick="toggleCollapse('${categoryId}')">
                        <h2>${getCategoryDisplayName(category)}</h2>
                        <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto;">
                            <path d="M8 11.1412L3.50423 6.3695C3.23943 6.0875 3.31515 5.6347 3.66558 5.45678C3.79454 5.39454 3.94195 5.39455 4.07091 5.45679L8 7.72514L11.9291 5.45679C12.2795 5.2788 12.7323 5.35457 12.9103 5.7049C12.9725 5.83387 12.9725 5.98125 12.9103 6.1102L8.4145 11.1412C8.2941 11.2718 8.1204 11.2718 8 11.1412Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="card-content">
                        <div class="items-grid">
                            <!-- Items will be dynamically populated here -->
                        </div>
                    </div>
                </div>
            `;
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sectionHTML;
            const newSection = tempDiv.firstElementChild;
            itemsContainer.appendChild(newSection);
            
            // Now populate this section
            updateCategorySection(categoryId, items);
        });
    }
    
    // Update the item counts based on currently visible items after everything is loaded
    setTimeout(() => {
        if (typeof updateVisibleCounts === 'function') {
            updateVisibleCounts();
        }
    }, 100);
}

function updateCategorySection(sectionId, items) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const itemsGrid = section.querySelector('.items-grid');
    if (!itemsGrid) return;
    
    // Update category name to include count
    const categoryName = section.querySelector('h2');
    if (categoryName) {
        const baseText = categoryName.textContent.split('(')[0].trim();
        categoryName.textContent = `${baseText} (${items.length})`;
    }
    
    // Clear existing items
    itemsGrid.innerHTML = '';
    
    // Add items
    items.forEach(item => {
        const itemId = `item-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const itemElement = document.createElement('div');
        itemElement.className = `item ${!item.isCompetitive ? 'non-competitive' : ''}`;
        itemElement.id = itemId;
        itemElement.onclick = () => toggleItem(itemId);
        
        itemElement.innerHTML = `
            <div class="item-header">
                <div class="item-name" style="color: ${getTierColor(item.tier)}">${item.name}</div>
                <div class="item-info">
                    <span>Level ${item.level}</span> • 
                    <span class="xp-bonus">XP Bonus: ${
                        item.xpBonus.min === item.xpBonus.max 
                            ? `${item.xpBonus.min}%`
                            : `${item.xpBonus.min}-${item.xpBonus.max}%`
                    }</span>
                </div>
                <span class="${item.restrictions === 'untradable' ? 'not-tradeable' : 'tradeable'}">
                    ${item.restrictions === 'untradable' ? 'Untradable' : 'Tradable'} 
                </span>
                ${!item.isCompetitive ? '<div class="efficiency-warning">(May be less efficient)</div>' : ''}
            </div>
            <div class="item-details">
                ${item.requirements && Object.keys(item.requirements).length > 0 ? `
                    <div class="stat-section">
                        <div class="section-title">Requirements</div>
                        ${Object.entries(item.requirements).map(([key, value]) => 
                            `<div class="stat">
                                <div class="stat-name">${key}</div>
                                <div class="stat-value">${value}</div>
                            </div>`
                        ).join('')}
                    </div>
                ` : ''}

                ${item.base ? `
                    <div class="stat-section">
                        <div class="section-title">Base Stats</div>
                        ${Object.entries(item.base).map(([key, value]) => {
                            const statValue = typeof value === 'object' ? 
                                (value.min && value.max ? `${value.min}-${value.max}` : value.raw || value) : 
                                value;
                            const isPositive = typeof value === 'object' ? 
                                (value.raw || 0) > 0 : value > 0;
                            return `<div class="stat ${isPositive ? 'positive' : 'negative'}">
                                <div class="stat-name">${key.replace('base', '')}</div>
                                <div class="stat-value">${statValue}</div>
                            </div>`;
                        }).join('')}
                    </div>
                ` : ''}

                ${item.identifications ? `
                    <div class="stat-section">
                        <div class="section-title">Identifications</div>
                        ${Object.entries(item.identifications).map(([key, value]) => {
                            if (key === 'xpBonus') return ''; // Already shown in header
                            const statValue = typeof value === 'object' ? 
                                `${value.min}-${value.max}` : value;
                            const isPositive = typeof value === 'object' ? 
                                (value.min || 0) > 0 : value > 0;
                            return `<div class="stat ${isPositive ? 'positive' : 'negative'}">
                                <div class="stat-name">${key}</div>
                                <div class="stat-value">${statValue}</div>
                            </div>`;
                        }).join('')}
                    </div>
                ` : ''}

                ${item.dropMeta ? `
                    <div class="stat-section">
                        <div class="section-title">Drop Location</div>
                        <div class="stat">
                            <div class="stat-name">Location</div>
                            <div class="stat-value">${item.dropMeta.name}</div>
                        </div>
                        ${item.dropMeta.type ? `
                            <div class="stat">
                                <div class="stat-name">Type</div>
                                <div class="stat-value">${item.dropMeta.type}</div>
                            </div>
                        ` : ''}
                        ${item.dropMeta.coordinates ? `
                            <div class="stat">
                                <div class="stat-name">Coordinates</div>
                                <div class="stat-value">${item.dropMeta.coordinates.join(', ')}</div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                ${item.powderSlots ? `
                    <div class="stat-section">
                        <div class="section-title">Other</div>
                        <div class="stat">
                            <div class="stat-name">Powder Slots</div>
                            <div class="stat-value">${item.powderSlots}</div>
                        </div>
                    </div>
                ` : ''}

                ${item.lore ? `
                    <div class="stat-section">
                        <div class="section-title">Lore</div>
                        <div class="lore-text">${item.lore}</div>
                    </div>
                ` : ''}
            </div>
        `;
        
        itemsGrid.appendChild(itemElement);
    });
}

function updateTimestamp() {
    const timestamp = document.getElementById('timestamp');
    if (!timestamp) return;
    
    // Clear any existing countdown
    if (timestamp.dataset.intervalId) {
        clearInterval(parseInt(timestamp.dataset.intervalId));
    }
    
    // Get the last update time from localStorage or use current time
    const lastUpdate = localStorage.getItem('lastUpdate') 
        ? parseInt(localStorage.getItem('lastUpdate'))
        : Date.now();
    
    // Store the last update time if not already set
    if (!localStorage.getItem('lastUpdate')) {
        localStorage.setItem('lastUpdate', lastUpdate.toString());
    }
    
    const nextUpdate = new Date(lastUpdate + 24 * 60 * 60 * 1000);
    
    // Format the date nicely
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    const formattedDate = new Date(lastUpdate).toLocaleDateString(undefined, options);
    
    // Set the timestamp text to the last update date
    timestamp.textContent = `Last updated: ${formattedDate}`;
}

function updateSummary(categories) {
    // Update the summary card
    document.getElementById('total-items').textContent = Object.values(categories)
        .reduce((sum, items) => sum + items.length, 0);
    
    // Update each category summary
    updateCategorySummary('helmet', categories['helmet'] || []);
    updateCategorySummary('chestplate', categories['chestplate'] || []);
    updateCategorySummary('leggings', categories['leggings'] || []);
    updateCategorySummary('boots', categories['boots'] || []);
    updateCategorySummary('ingredient', categories['ingredient'] || []);
}

function updateCategorySummary(category, items) {
    const countElement = document.getElementById(`${category}-count`);
    const tradeableElement = document.getElementById(`${category}-tradeable`);
    const maxXpElement = document.getElementById(`${category}-max-xp`);
    
    if (countElement) countElement.textContent = items.length;
    
    if (tradeableElement) {
        const tradeableCount = items.filter(item => item.restrictions !== 'untradable').length;
        tradeableElement.textContent = tradeableCount;
    }
    
    if (maxXpElement) {
        const maxXp = items.length ? Math.max(...items.map(item => 
            item.xpBonus.max || item.xpBonus.raw || 0
        )) : 0;
        maxXpElement.textContent = `${maxXp}%`;
    }
}

function processItems(items) {
    const categories = {};
    
    // Process each item and sort into categories
    Object.entries(items).forEach(([itemName, item]) => {
        let category;
        if (item.type === 'weapon') {
            category = item.weaponType || 'Unknown Weapon';
        } else if (item.type === 'armour') {
            category = item.armourType || 'Unknown Armor';
        } else if (item.type === 'accessory') {
            category = item.accessoryType || 'Unknown Accessory';
        } else {
            category = item.type || 'Unknown';
        }
        
        if (!categories[category]) categories[category] = [];
        
        categories[category].push({
            name: itemName,
            tier: item.tier || 'NORMAL',
            level: item.requirements?.level || 0,
            xpBonus: typeof item.identifications.xpBonus === 'object' 
                ? item.identifications.xpBonus 
                : { min: item.identifications.xpBonus, max: item.identifications.xpBonus, raw: item.identifications.xpBonus },
            restrictions: item.restrictions || 'tradable',
            identifications: item.identifications,
            requirements: item.requirements || {},
            base: item.base,
            dropMeta: item.dropMeta,
            powderSlots: item.powderSlots,
            lore: item.lore
        });
    });

    // Sort items in each category by level and filter less efficient ones
    Object.entries(categories).forEach(([categoryName, categoryItems]) => {
        // Sort by level
        categoryItems.sort((a, b) => a.level - b.level);
        
        // Filter out less efficient items
        const filteredItems = filterEfficientItems(categoryItems, categoryName);
        categoryItems.length = 0;
        categoryItems.push(...filteredItems);
    });

    return categories;
}

async function fetchItems() {
    try {
        console.log('Fetching items from API...');
        const response = await fetch('https://api.leolucadatri.io/api/items', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success || !data.items) {
            console.error('API returned error:', data.error || 'Unknown error');
            // Show error message in the UI
            showErrorMessage(data.error || 'Failed to fetch items');
            return;
        }

        console.log('Data received from API');
        saveToCache(data.items);
        localStorage.setItem('lastUpdate', Date.now().toString());

        const categories = processItems(data.items);
        updateUI(categories);
        updateTimestamp();
        updateSummary(categories);

    } catch (error) {
        console.error('Error fetching items:', error);
        // Try to load from cache if API fetch fails
        const cachedItems = getFromCache();
        if (cachedItems) {
            console.log('Loading from cache due to API error');
            const categories = processItems(cachedItems);
            updateUI(categories);
            updateTimestamp();
            updateSummary(categories);
        } else {
            showErrorMessage(error.message);
        }
    }
}

function showErrorMessage(message) {
    // Show error in each category section
    const sections = ['helmet-section', 'chestplate-section', 'leggings-section', 'boots-section'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const itemsGrid = section.querySelector('.items-grid');
        if (!itemsGrid) return;
        
        itemsGrid.innerHTML = `
            <div class="error-message" style="padding: 1rem; color: var(--not-tradeable);">
                Error: ${message}<br>
                <small>Please try again later.</small>
            </div>
        `;
    });
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cachedItems = getFromCache();
    if (cachedItems) {
        const categories = processItems(cachedItems);
        updateUI(categories);
        updateTimestamp();
        updateSummary(categories);
    } else {
        fetchItems();
    }
});