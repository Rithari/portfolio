import {NextResponse} from 'next/server';
import {createClient} from '@vercel/edge-config';
import type {AnnouncementType} from '@/components/ui/announcement-banner';

// Define the type for our announcement data
interface AnnouncementData {
  text: string;
  type: AnnouncementType;
}

export const runtime = 'edge';

export async function GET() {
  try {
    let announcementText = '';
    let announcementType: AnnouncementType = 'info';
    
    // Check if we're in development mode
    if (process.env.NODE_ENV === 'development') {
      // Use LOCAL_ANNOUNCEMENT environment variable in development
      announcementText = process.env.LOCAL_ANNOUNCEMENT || '';
      // Make sure the type is valid, default to 'info' if not
      const typeFromEnv = process.env.LOCAL_ANNOUNCEMENT_TYPE || 'info';
      announcementType = (typeFromEnv === 'warning' || typeFromEnv === 'info') 
        ? typeFromEnv as AnnouncementType 
        : 'info';
        
      console.log('Using local announcement:', { text: announcementText, type: announcementType });
    } else {
      // In production, use Edge Config
      try {
        // Make sure we have an Edge Config URL
        const edgeConfigUrl = process.env.EDGE_CONFIG;
        if (!edgeConfigUrl) {
          console.error('EDGE_CONFIG environment variable is not defined');
          throw new Error('Missing Edge Config URL');
        }
        
        const client = createClient(edgeConfigUrl);
        
        // Try to get the announcement data
        const announcementData = await client.get('announcement');
        
        if (typeof announcementData === 'object' && announcementData !== null) {
          // If it's stored as an object with text and type properties
          const data = announcementData as Record<string, unknown>;
          
          // Extract text with type safety
          if (typeof data.text === 'string') {
            announcementText = data.text;
          }
          
          // Extract type with validation
          if (typeof data.type === 'string' && 
             (data.type === 'warning' || data.type === 'info')) {
            announcementType = data.type as AnnouncementType;
          }
        } else if (typeof announcementData === 'string') {
          // For backward compatibility: if it's stored as just a string
          announcementText = announcementData;
          
          // Try to get a separate type value
          const typeValue = await client.get('announcementType');
          
          // Validate the type value
          if (typeof typeValue === 'string' && 
             (typeValue === 'warning' || typeValue === 'info')) {
            announcementType = typeValue as AnnouncementType;
          }
        }
      } catch (error) {
        console.error('Error fetching from Edge Config:', error);
      }
    }
    
    return NextResponse.json(
      { 
        announcement: announcementText,
        type: announcementType 
      },
      {
        headers: {
          'Cache-Control': 'max-age=60', // Cache for 60 seconds
        },
      }
    );
  } catch (error) {
    console.error('Error in announcement API:', error);
    return NextResponse.json({ announcement: '', type: 'info' }, { status: 500 });
  }
}