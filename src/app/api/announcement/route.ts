import {NextResponse} from 'next/server';
import {createClient} from '@vercel/edge-config';
import type {AnnouncementType} from '@/components/ui/announcement-banner';

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
        
      console.log('Using local announcement:', { announcement: announcementText, type: announcementType });
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
        
        // Fetch announcement text and type as separate keys from Edge Config
        const announcementData = await client.get('announcement') as string;
        if (announcementData) {
          announcementText = announcementData;
        }
        
        // Fetch the announcement type
        const typeData = await client.get('type') as string;
        if (typeData && (typeData === 'warning' || typeData === 'info')) {
          announcementType = typeData as AnnouncementType;
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