# Fix broken images, hero sizing, and services layout

## Changes

1. **About page photo loads reliably**
   - Replace the broken CDN pointer (`about-clinical.jpg.asset.json`) with the file in the public folder: `/medical-grade-storage-facility.webp` (best match among uploaded files — easy to swap if a different file was intended).
   - Reference it directly as a public path, no asset import.

2. **Top logo loads reliably**
   - Header: swap the `logo-wide.png.asset.json` CDN pointer for `/logo-wide.png` from the public folder (identical file, self-hosted).
   - Leave the footer logo as-is (user only reported the top logo), unless the same fix is clearly needed there.

3. **Hero photos fit one screen**
   - Resize the homepage hero slider from fixed heights (520/560/600px) to a viewport-fitting height: `calc(100dvh - header)` with sensible min/max so the full slide is visible without scrolling on desktop and mobile.
   - Keep `object-contain` so photos are never cropped; tighten text overlay spacing so it stays inside the visible frame.

4. **Services becomes a single scrolling line**
   - Replace the 3-column services grid with one horizontal row that auto-scrolls right to left (reusing the existing marquee animation pattern from `FeaturedMarquee`), pausing on hover, cards sized so the row reads as one continuous line.

## Technical notes

- Files touched: `src/routes/about.tsx`, `src/components/site-chrome.tsx`, `src/routes/index.tsx`, `src/routes/services.tsx`.
- Unused broken `.asset.json` pointers (about-clinical, logo-wide) removed from imports; pointer files themselves left untouched unless the CDN objects should also be deleted.
- Verify with a Playwright pass: about photo visible, header logo visible, hero fits in viewport, services marquee scrolls.
