<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

- **Content** lives in `src/config/site.ts` (personal info) and `src/data/*` (projects, services, skills). Components read from there — don't hard-code content in JSX.
- **Styling**: CSS Modules + global design tokens in `src/styles/tokens.css` (ACSS-style names: `--primary`, `--space-m`, `--text-l`, `--radius` …). Prefer tokens over raw colour/size values. No Tailwind.
- **Server Components by default**; add `'use client'` only for interactive islands (`Header`, `ScrambleText`, `SpotlightCard`, `CopyEmailButton`, `ContactForm`, `components/three/*`). Server Actions live in `src/app/actions/`.
- **3D scene** (`src/components/three`) is a fixed background rendered with React Three Fiber, lazy-loaded client-side only. Sections opt in to orb placement with `data-scene="hero|left|right|center"` (presets in `sceneStops.ts`). Update per-frame values through refs inside `useFrame` — never React state.
- **Motion**: every animation must respect `prefers-reduced-motion`. Scroll reveals use CSS `animation-timeline: view()` via the `data-reveal` attribute (no JS).
- Before committing run `npm run lint && npm run typecheck && npm run format:check && npm run build`.
- **Git workflow** (see README → Git workflow): branch `feature/*` / `fix/*` / `chore/*` off `dev`, open the PR against **`dev`** (never `main`), squash-merge once CI is green. `dev` is staging (Vercel preview). Promote to production only with a `dev` → `main` PR using a **merge commit**, and only after the owner confirms testing on staging is done.
