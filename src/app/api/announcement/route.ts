import {NextResponse} from 'next/server';
import {createClient} from '@vercel/edge-config';

export const runtime = 'edge';

export async function GET() {
  try {
    let announcement = '';
    
    // Create Edge Config client to access stored values
    const client = createClient(process.env.EDGE_CONFIG);
    
    if (client) {
      // Get the announcement value from Edge Config
      announcement = await client.get('announcement') || '';
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
    console.error('Error fetching announcement:', error);
    return NextResponse.json({ announcement: '' }, { status: 500 });
  }
}