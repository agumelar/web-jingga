# web-jingga Implementation Plan

## Status: COMPLETED ✅
**Tanggal:** 28 Maret 2026

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

### Phase 5: Full Website Template (COMPLETED)
- [x] Task 8: Update BaseLayout with full navigation + footer
- [x] Task 9: Homepage with all sections
- [x] Task 10: Profil pages (profil, visi-misi, sejarah, struktur)
- [x] Task 11: Akademik pages (jurusan, kurikulum, kesiswaan)
- [x] Task 12: Layanan pages (ppdb, informasi)
- [x] Task 13: Siswa pages (osis, paskibra, pramuka, pmr, kplh)
- [x] Task 14: Sarana prasana

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
│   │   └── berita/ (65 posts)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── berita/
│       ├── profil/
│       ├── akademik/
│       ├── siswa/
│       ├── atph.astro
│       ├── rpl.astro
│       ├── tbsm.astro
│       ├── kurikulum.astro
│       ├── kesiswaan.astro
│       ├── hubungan-industri.astro
│       ├── ppdb.astro
│       └── ...
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
        └── plans/
```
