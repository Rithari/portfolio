import {NextResponse} from 'next/server';

export async function GET() {
  try {

    const announcement = process.env.ANNOUNCEMENT_TEXT || '';
    
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