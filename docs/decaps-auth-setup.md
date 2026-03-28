# Setup decaps-auth (Cloudflare Workers)

## Prerequisites
1. Akun Cloudflare (free)
2. Akun GitHub dengan OAuth App

## Steps

### 1. Buat OAuth App di GitHub
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill:
   - Application name: `web-jingga CMS`
   - Homepage URL: `https://smkn1rongga.sch.id`
   - Authorization callback URL: `https://your-worker.workers.dev/callback`
4. Copy **Client ID** dan **Client Secret**

### 2. Deploy decaps-auth ke Cloudflare Workers

```bash
# Install wrangler (Cloudflare CLI)
npm install -g wrangler

# Login ke Cloudflare
wrangler login

# Clone decaps-auth
git clone https://github.com/halkeye/decaps-auth.git
cd decaps-auth

# Copy config example
cp config.toml.example config.toml
```

### 3. Edit config.toml
```toml
[github]
client_id = "YOUR_GITHUB_CLIENT_ID"
client_secret = "YOUR_GITHUB_CLIENT_SECRET"

[server]
host = "0.0.0.0"
port = 8080

[server.internal]
host = "127.0.0.1"
port = 8090
```

### 4. Deploy
```bash
wrangler deploy
```

### 5. Copy Worker URL
Setelah deploy, akan dapat URL seperti: `https://decaps-auth.xxx.workers.dev`

### 6. Update Decap CMS config
Edit `public/admin/config.yml`:
```yaml
oauth:
  backend_url: "https://your-decaps-auth.workers.dev"
  base_url: "https://smkn1rongga.sch.id"
```

## Troubleshooting

### Error: "redirect_uri mismatch"
Pastikan callback URL di GitHub OAuth App sama dengan yang di config.

### Error: "Could not find repository"
Pastikan repo GitHub sudah dibuat dan user punya akses.
