import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

// Import FontAwesome brand icons
import {
  faJava,
  faJs,
  faPython,
  faReact,
  faNodeJs,
  faAws,
  faJira,
  faGit,
  faDocker,
  faNpm,
  faGithub,
  faBootstrap,
  faCss3,
  faHtml5,
  faLinux,
  faPhp,
  faMicrosoft,
  IconDefinition
} from '@fortawesome/free-brands-svg-icons';

// Import FontAwesome solid icons for specialized technical concepts
import {
  faDatabase,
  faDiagramProject,
  faGears,
  faMicrochip,
  faTerminal,
  faSitemap
} from '@fortawesome/free-solid-svg-icons';

// Import MongoDB icon from Simple Icons
import {siMongodb, siDotnet, siRedis, siC} from 'simple-icons/icons';

// Map tech names to their FontAwesome icons
export const techIconMap: Record<string, IconDefinition | null> = {
  // Languages
  'java': faJava,
  'javascript': faJs,
  'python': faPython,
  'typescript': faJs,
  
  // Frameworks & Libraries
  'react': faReact,
  'node.js': faNodeJs,
  'express': faNodeJs,
  'spring': faJava, // Using Java icon for Spring
  'spring boot': faJava, // Using Java icon for Spring Boot
  
  // Databases - using database icon
  'sql': faDatabase,
  'nosql': faDatabase,
  
  // Cloud & DevOps
  'aws': faAws,
  'docker': faDocker,
  'npm': faNpm,
  'github': faGithub,
  
  // Tools
  'git': faGit,
  'project management': faJira,
  'software engineering methodologies': faJira, // Use Jira icon for software methodologies
  'agile': faJira, // Use Jira icon for agile
  'team management': faJira, // Use Jira icon for team management
  
  // Neural networks - using diagram project icon
  'neural networks': faDiagramProject,
  'reinforcement learning': faDiagramProject,
  
  // Compiler design and parsing - adding appropriate icons
  'compiler design': faGears,  // Gears icon represents the compilation process
  'parsing': faSitemap,        // Sitemap icon represents parsing trees/structures
  
  // Other technologies with icons
  'bootstrap': faBootstrap,
  'css': faCss3,
  'html': faHtml5,
  'linux': faLinux,
  'php': faPhp,
  'microsoft': faMicrosoft,
  
  // Non-branded concepts that still need icons
  'dynatrace': faMicrochip,    // Using microchip for monitoring software
  'apm': faTerminal           // Using terminal for Application Performance Monitoring
};

// MongoDB will use Simple Icons logo
export const simpleTechIconMap: Record<string, any> = {
  'mongodb': siMongodb,
  'c#': siDotnet,
  'redis': siRedis,
  'c': siC // Only match exact "c", not part of words
};

// Function to get the correct icon for a tech
export function getTechIcon(tech: string): IconDefinition | null {
  // Convert to lowercase for case-insensitive matching
  const techLower = tech.toLowerCase();
  
  // Direct match
  if (techIconMap[techLower]) {
    return techIconMap[techLower];
  }
  
  // Look for partial matches - but only if the match is a whole word
  for (const [key, value] of Object.entries(techIconMap)) {
    // Check for word boundaries around the key to avoid partial matches
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(techLower)) {
      return value;
    }
  }
  
  // No match found
  return null;
}

// Function to get Simple Icon if available
export function getSimpleTechIcon(tech: string): any | null {
  const techLower = tech.toLowerCase();
  
  // Direct match
  if (simpleTechIconMap[techLower]) {
    return simpleTechIconMap[techLower];
  }
  
  // Look for partial matches - but only if the match is a whole word
  for (const [key, value] of Object.entries(simpleTechIconMap)) {
    // Check for word boundaries around the key to avoid partial matches
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(techLower)) {
      return value;
    }
  }
  
  return null;
}
