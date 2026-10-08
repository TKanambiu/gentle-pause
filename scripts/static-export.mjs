// Flattens the SPA build into a plain static site for cPanel/public_html.
// Result: dist/index.html (+ assets, .htaccess) — no Node.js server needed.
import { cpSync, existsSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";

const client = "dist/client";
if (!existsSync(client)) throw new Error("dist/client missing — run vite build first");

for (const entry of readdirSync("dist")) {
  if (entry !== "client") rmSync(`dist/${entry}`, { recursive: true, force: true });
}
cpSync(client, "dist", { recursive: true });
rmSync(client, { recursive: true, force: true });

if (existsSync("dist/_shell.html")) {
  rmSync("dist/index.html", { force: true });
  renameSync("dist/_shell.html", "dist/index.html");
}
if (!existsSync("dist/index.html")) throw new Error("dist/index.html was not generated");

writeFileSync(
  "dist/.htaccess",
  `# Static SPA routing for Apache/cPanel
DirectoryIndex index.html
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
`,
);
console.log("Static site ready in dist/ (entry: dist/index.html)");
