# web-jingga Implementation Plan

## Overview
Modernisasi website SMKN 1 Rongga dengan arsitektur decoupled: Astro SSG + Decap CMS + Google Auth

## Tech Stack
- **Frontend:** Astro (SSG)
- **CMS:** Decap CMS (Git-based)
- **Auth:** decaps-auth (Cloudflare Workers)
- **Hosting:** Vercel (Hobby Plan)
- **Storage:** GitHub (content) + CDN (images)

## Task List

### Phase 1: Setup Project
- [x] Task 1: Initialize Astro Project
- [x] Task 2: Setup Content Collections (Zod schema)
- [x] Task 3: Setup Basic Layout & Pages
- [x] Task 4: Setup Decap CMS

### Phase 2: Authentication
- [x] Task 5: Setup decaps-auth (Cloudflare Workers) - Guide created

### Phase 3: Migration
- [x] Task 6: Setup Migration Script (XML → Markdown) - 65 posts migrated

### Phase 4: Deployment
- [ ] Task 7: Deploy to Vercel + Custom Domain

---

## File Structure Target
```
web-jingga/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── berita/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       └── berita/[...slug].astro
├── public/
│   ├── admin/
│   │   ├── index.html
│   │   └── config.yml
│   └── uploads/
├── scripts/
│   └── migrate-wordpress.js
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-03-28-web-jingga-setup-design.md
        └── plans/
            └── 2026-03-28-web-jingga-setup-plan.md
```
