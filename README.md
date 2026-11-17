# Mubashir Hussain — Personal Portfolio

Awwwards-inspired personal portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Framer Motion**.

## Features

- Animated intro loader with name reveal
- Kinetic hero with floating gradient atmosphere + masked text reveal
- Custom cursor + magnetic buttons (desktop)
- Scroll progress bar, reveal animations, parallax about panel
- Skills bars + infinite tech marquee
- Filterable project grid with 3D tilt hover
- **Orbit Workbench** — signature draggable project constellation
- Animated experience timeline + testimonials slider
- Contact form (Formspree or mailto fallback)
- Dark / light mode with system preference + persistence
- `prefers-reduced-motion` respected throughout
- SEO meta, Open Graph, semantic HTML, SVG favicon

## Customize content

Edit a single file:

```
src/data/site.ts
```

Update name, bio, skills, projects, experience, social links, and contact details.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form (optional)

1. Create a form at [Formspree](https://formspree.io)
2. Copy `.env.example` → `.env.local`
3. Set `NEXT_PUBLIC_FORMSPREE_ID=your_id`

Without Formspree, the form opens the user’s mail client via `mailto:`.

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add env vars if needed (`NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_SITE_URL`)
4. Deploy — Vercel detects Next.js automatically

Or CLI:

```bash
npx vercel
```

## Deploy on Netlify

1. Build command: `npm run build`
2. Publish directory: `.next` (or use the official Next.js runtime)
3. Prefer the [Netlify Next.js Runtime](https://docs.netlify.com/frameworks/next-js/overview/) for App Router support

## Stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | Next.js 16 (App Router)         |
| Styling      | Tailwind CSS 4                  |
| Motion       | Framer Motion                   |
| Fonts        | Syne + DM Sans (Google Fonts)   |
| Language     | TypeScript                      |
