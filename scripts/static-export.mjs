// Export the TanStack Start SPA for static Apache/cPanel hosting.
// With the installed Vite/Nitro versions, the browser build is in .output/public.
// Some older configurations use dist/client; support either directory.
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const candidates = [".output/public", "dist/client"];
const source = candidates.find(
  (dir) =>
    existsSync(dir) &&
    (existsSync(join(dir, "index.html")) || existsSync(join(dir, "_shell.html"))),
);

if (!source) {
  throw new Error(
    "No static SPA output found. Expected index.html or _shell.html in .output/public or dist/client after vite build.",
  );
}

// Stage first so dist/client can be copied safely if an older build is used.
const staging = ".static-export-staging";
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });
for (const item of readdirSync(source)) {
  cpSync(join(source, item), join(staging, item), { recursive: true });
}

// Include unchanged photos/logos/favicon even if the build tool did not copy them.
if (existsSync("public")) {
  cpSync("public", staging, {
    recursive: true,
    force: false,
    errorOnExist: false,
  });
}

if (!existsSync(join(staging, "index.html")) && existsSync(join(staging, "_shell.html"))) {
  renameSync(join(staging, "_shell.html"), join(staging, "index.html"));
}
if (!existsSync(join(staging, "index.html"))) {
  throw new Error("Static export failed: no index.html was generated.");
}
if (!existsSync(join(staging, "assets"))) {
  throw new Error("Static export failed: compiled assets/ directory is missing.");
}

writeFileSync(
  join(staging, ".htaccess"),
  `# Apache rewrite rules for static single-page app routes
DirectoryIndex index.html
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
</IfModule>
`,
);

rmSync("dist", { recursive: true, force: true });
renameSync(staging, "dist");
console.log(`Static site ready in dist/ (source: ${source}, entry: dist/index.html)`);
