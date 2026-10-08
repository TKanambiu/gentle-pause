"""Regression checks for self-contained cPanel photo hosting."""
import json
import unittest
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent


class PhotoHostingTests(unittest.TestCase):
    def test_every_optimized_photo_is_a_repository_file(self):
        manifest = json.loads((ROOT / 'src/data/optimized-images.json').read_text())
        self.assertGreater(len(manifest), 100)
        for original, photo in manifest.items():
            for variant in photo['variants']:
                with self.subTest(original=original, width=variant['width']):
                    url = variant['url']
                    self.assertTrue(url.startswith(('/optimized/', '/NewHeros/')))
                    file = ROOT / 'public' / unquote(url.lstrip('/'))
                    self.assertTrue(file.is_file(), f'Missing repository photo: {url}')
                    self.assertEqual(file.stat().st_size, variant['bytes'])


if __name__ == '__main__':
    unittest.main()