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
- Use static CDN asset pointers for the known partner logo collection; a runtime logo service is unnecessary.
- Keep SPA output in dist/client with Apache fallback to _shell.html; cPanel serves static files without an application server.
- Use the existing live site's public Supabase connection for browser-only staff sign-in; the operations editor remains on the live console, and no private data is exposed by the local sign-in screen.
- Use full-width large content container tokens while keeping readable text blocks and forms constrained; this removes desktop gutters without stretching login forms.
