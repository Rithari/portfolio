import {NextResponse} from 'next/server';
import {createClient} from '@vercel/edge-config';

export const runtime = 'edge';

export async function GET() {
  try {
    let announcement = '';
    
    // Check if we're in development mode
    if (process.env.NODE_ENV === 'development') {
      // Use LOCAL_ANNOUNCEMENT environment variable in development
      announcement = process.env.LOCAL_ANNOUNCEMENT || '';
      console.log('Using local announcement:', announcement);
    } else {
      // In production, use Edge Config
      try {
        const client = createClient(process.env.EDGE_CONFIG);
        if (client) {
          announcement = await client.get('announcement') || '';
        }
      } catch (error) {
        console.error('Error fetching from Edge Config:', error);
      }
    }
    
    return NextResponse.json(
      { announcement },
      {
        headers: {
          'Cache-Control': 'max-age=60', // Cache for 60 seconds
        },
      }
    );
  } catch (error) {
    console.error('Error in announcement API:', error);
    return NextResponse.json({ announcement: '' }, { status: 500 });
  }
}