# Arnaud Duflot · Portfolio

Personal portfolio for Arnaud Duflot, Product Ops & AI Automation Engineer.

**Production site:** [portfolio-arnaud.pages.dev](https://portfolio-arnaud.pages.dev)

## Stack

- [Astro 4](https://astro.build) (SSG)
- MDX content collections with Zod validation
- Canvas 2D / WebGL particle system
- Deployed via Netlify or Cloudflare Pages

## Development

```bash
cd astro-version
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
cd astro-version
npm run build
npm run preview
```

Output is written to `astro-version/dist/`.

## Deploy (Netlify)

The `astro-version/netlify.toml` config runs `npm run build` and publishes `dist/`.

Set the site root to `astro-version/` in your Netlify project settings, or connect the repo with:

- **Base directory:** `astro-version`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Content

Case studies live in `astro-version/src/content/projects/*.mdx`. Edit frontmatter and MDX body, then rebuild.

## Legacy

The old static HTML site is archived in `legacy-static/` (not deployed).
