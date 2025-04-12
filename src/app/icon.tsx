import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

// This file exists only to specify metadata for the icon
// The actual icon is served from the static file in public

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  // Get the path to the icon file
  const iconPath = join(process.cwd(), 'src', 'app', 'favicon-32x32.png');
  // Read the file as buffer
  const iconBuffer = readFileSync(iconPath);
  // Return as a response
  return new NextResponse(iconBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=2592000',
    },
  });
}