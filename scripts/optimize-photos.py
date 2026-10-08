"""Regenerate repository-hosted static photo variants (requires Python Pillow)."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
OPTIMIZED = PUBLIC / 'optimized'
OPTIMIZED.mkdir(parents=True, exist_ok=True)

def optimize(path):
    relative = path.relative_to(PUBLIC)
    if relative.parts[0] == 'icons' or path.name.startswith(('logo', 'log ')) or path.name == 'favicon.png':
        return None
    try:
        with Image.open(path) as opened:
            image = ImageOps.exif_transpose(opened).convert('RGBA' if 'A' in opened.getbands() else 'RGB')
    except Exception:
        return None
    hero = relative.parts[0] == 'NewHeros'
    largest = min(image.width, 1672 if hero else 1280)
    widths = sorted(set([min(largest, 768 if hero else 480), largest]))
    variants = []
    for width in widths:
        resized = image.resize((width, max(1, round(image.height * width / image.width))), Image.Resampling.LANCZOS)
        name = f'{path.stem}-{width}.webp'
        if hero:
            target = path.parent / name
            resized.save(target, 'WEBP', quality=82, method=6)
            url = '/' + str(target.relative_to(PUBLIC))
            size = target.stat().st_size
        else:
            key = hashlib.sha256(str(relative).encode()).hexdigest()[:12]
            target = OPTIMIZED / f'{key}-{width}.webp'
            resized.save(target, 'WEBP', quality=82, method=6)
            url = '/' + str(target.relative_to(PUBLIC))
            size = target.stat().st_size
        variants.append({'width': width, 'url': url, 'bytes': size})
    return '/' + str(relative), {'width': image.width, 'height': image.height, 'variants': variants, 'originalBytes': path.stat().st_size}

if __name__ == '__main__':
    # Only original files: generated WebP variants and logo/icon assets are excluded.
    paths = sorted(p for p in PUBLIC.rglob('*') if p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp') and 'optimized' not in p.relative_to(PUBLIC).parts and not (p.parent.name == 'NewHeros' and p.suffix == '.webp'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        manifest = dict(item for item in pool.map(optimize, paths) if item)
    (ROOT / 'src/data/optimized-images.json').write_text(json.dumps(manifest, indent=2) + '\n')
    original = sum(item['originalBytes'] for item in manifest.values())
    optimized = sum(item['variants'][-1]['bytes'] for item in manifest.values())
    print(f'Optimized {len(manifest)} photos: {original:,} → {optimized:,} bytes ({100 * (1 - optimized / original):.1f}% smaller)')