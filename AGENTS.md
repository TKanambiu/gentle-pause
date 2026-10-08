<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep homepage slide content in a browser-safe data module shared with image preloading so photography and preload references stay aligned.
- Keep supplied homepage hero photography in `public/NewHeros` and reference those committed files directly so static deployments remain self-contained.
- Reference partner logos directly from committed `public/icons` files and site photos from committed public files so cPanel deployments do not depend on Lovable asset serving.
- Build flattens SPA output into dist/ with index.html at the root and Apache fallback to index.html; cPanel serves static files without an application server.
- Use the existing live site's public Supabase connection for browser-only staff sign-in; the operations editor remains on the live console, and no private data is exposed by the local sign-in screen.
- Use full-width large content container tokens while keeping readable text blocks and forms constrained; this removes desktop gutters without stretching login forms.
- Derive the header category navigation and overflow menu from the shared catalogue so category links remain aligned with product pages.

- Use the shared optimized-photo manifest and image component for responsive static WebP variants; keep unknown remote uploads unchanged so catalogue URLs remain compatible.
- Generate supplied homepage photo variants in public/NewHeros and other optimized photo variants in public/optimized with local manifest URLs so static exports contain every variant; preload only the homepage’s first photo in its leaf route.
