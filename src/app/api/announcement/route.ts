import {NextResponse} from 'next/server';

export async function GET() {
  try {
    // Since we're not using edge runtime, we'll simulate the announcement API
    // In production, you'll need to set up environment variables or use another approach
    
    // This will return a dummy announcement in development
    // In production, you should configure Cloudflare Pages to include your KV data
    const announcement = process.env.ANNOUNCEMENT || '';
    
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