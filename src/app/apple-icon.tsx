 
// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default async function AppleIcon() {
  // Use the existing apple-touch-icon.png
  return fetch(new URL('./apple-touch-icon.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
}