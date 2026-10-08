import manifest from '@/data/optimized-images.json';

type OptimizedImage = {
  width: number;
  height: number;
  variants: { width: number; url: string; bytes: number }[];
};

const images: Record<string, OptimizedImage> = manifest;

/** Only known local originals are replaced; remote/uploaded URLs remain untouched. */
export function imageProps(src: string | undefined, sizes = '100vw') {
  const image = src ? images[src] : undefined;
  const largest = image?.variants.at(-1);
  if (!image || !largest) return { src };
  return {
    src: largest.url,
    srcSet: image.variants.map((variant) => `${encodeURI(variant.url)} ${variant.width}w`).join(', '),
    sizes,
    width: image.width,
    height: image.height,
  };
}