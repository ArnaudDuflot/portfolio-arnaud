# Arnaud Duflot · Portfolio

Personal portfolio website for Arnaud Duflot, Product Operations Specialist. Minimalist, responsive, light/dark mode adaptive.

## Run Locally

Just open `index.html` in your browser, or serve via Python:

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

## Deploy to Netlify

### Option 1: Drag & Drop (fastest)

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the entire project folder onto the page
3. Netlify deploys instantly — you'll get a `*.netlify.app` URL

### Option 2: Connect Git Repository

1. Push this folder to a GitHub repo
2. Log in to [Netlify](https://netlify.com)
3. Click **Add new site > Import an existing project**
4. Connect your GitHub account and select the repo
5. Netlify auto-detects it's a static site (no build command needed)
6. Click **Deploy**

## Connect Custom Domain (arnaudduflot.com)

1. Buy the domain from a registrar (Namecheap, OVH, Gandi, etc.)

2. In Netlify, go to your site → **Domain settings** → **Add custom domain**

3. Enter `arnaudduflot.com`

4. Configure DNS (two options):

   **Option A — Netlify DNS (recommended):**
   - In your domain registrar, set nameservers to:
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`
   - Netlify handles the rest, including SSL

   **Option B — CNAME record:**
   - In your registrar's DNS settings, add a CNAME record:
     - Host: `@` (or `www`)
     - Value: `[your-site-name].netlify.app`

5. Wait for DNS propagation (can take up to 48h, usually ~30 min)

6. Netlify auto-provisions a free SSL certificate via Let's Encrypt

## Update Content

1. Edit `index.html` to change text, add/remove case studies, etc.
2. Re-deploy: push to Git (Netlify auto-deploys on push) or drag & drop again on netlify.com/drop
