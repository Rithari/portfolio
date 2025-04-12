 
// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  // Use the existing favicon-32x32.png
  return fetch(new URL('./favicon-32x32.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
}