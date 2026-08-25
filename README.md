# vitepress-theme-oreui

A full-featured VitePress theme inspired by the Ore UI / Minecraft Bedrock design language.

This repository contains the theme source used to build documentation sites with VitePress.

Key points
- Language: TypeScript
- Framework: Vue 3 + VitePress
- Entry: theme/index.ts

Quick start

Requirements
- Node.js 18+ and npm (or yarn/pnpm)

Install

```bash
npm ci
# or
# npm install
```

Development

```bash
npm run dev
# opens local VitePress dev server for the docs folder
```

Build docs

```bash
npm run build
# outputs built site in .vitepress/dist (per VitePress default)
```

Preview

```bash
npm run preview
```

Notes
- This package uses TypeScript; run a type check with `npx tsc --noEmit` if needed.
- The project has no tests configured by default.

Contributing
See CONTRIBUTING.md for how to contribute. Open issues or PRs for changes to the theme or docs.

License
MIT — see the LICENSE file.

Author
Antigravity
