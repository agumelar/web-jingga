# Deploy ke Vercel

## Prerequisites
1. Akun Vercel (vercel.com)
2. Akun GitHub dengan repository

## Steps

### 1. Push Project ke GitHub
```bash
cd web-jingga

# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit: Astro + Decap CMS setup"

# Buat repository di GitHub, lalu:
git remote add origin https://github.com/username/web-jingga.git
git branch -M main
git push -u origin main
```

### 2. Import ke Vercel
1. Login ke https://vercel.com
2. Click "Add New..." → Project
3. Import GitHub repository `web-jingga`
4. Configure:
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Deploy
Click "Deploy". Tunggu ~1-2 menit.

### 4. Setup Custom Domain
1. Setelah deploy berhasil, go to Settings → Domains
2. Add domain: `smkn1rongga.sch.id`
3. Ikuti instruksi DNS:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

## Setup decaps-auth (OAuth)

Setelah Vercel deployed dan domain aktif:

1. Ikuti panduan di `docs/decaps-auth-setup.md`
2. Setelah decaps-auth running, update `public/admin/config.yml`:
```yaml
oauth:
  backend_url: "https://your-decaps-auth.workers.dev"
  base_url: "https://smkn1rongga.sch.id"
```
3. Commit dan push perubahan
4. Vercel akan auto-redeploy

## Struktur Final
```
web-jingga/
├── src/
│   ├── content/berita/   # 65 post dari WP
│   ├── layouts/          # BaseLayout.astro
│   └── pages/             # index, berita
├── public/
│   ├── admin/             # Decap CMS
│   └── uploads/          # Images
└── docs/                  # Panduan
```

## Testing Lokal
```bash
npm run dev
# Buka http://localhost:4321
```
