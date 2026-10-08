import type { ImgHTMLAttributes } from 'react';
import { imageProps } from '@/lib/optimized-images';

/** Responsive compressed photos with an unchanged fallback for uploaded images. */
export function OptimizedImage({ src, sizes, loading = 'lazy', decoding = 'async', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...imageProps(src, sizes)} loading={loading} decoding={decoding} {...props} />;
}