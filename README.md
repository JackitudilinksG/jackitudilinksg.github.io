# Personal Portfolio

A personal portfolio website built with Next.js, showcasing my projects, contributions, and contact information.

🌐 **Live Site:** [dericjojo.vercel.app](https://dericjojo.vercel.app)

![Portfolio Preview](./preview.png)

---

## Features

- GitHub contribution graph pulled live from the GitHub GraphQL API
- Scroll-based blur animation on the hero section
- Dark/light mode toggle
- Pages for About, Projects, and Contact
- Responsive layout

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework with App Router
- TypeScript — type-safe components
- CSS Modules — scoped styling
- GitHub GraphQL API — live contribution data
- Vercel — deployment

## Project Structure

```
src/app/
├── api/
│   └── contributions/   # GitHub GraphQL API route
├── components/          # Shared components (Navbar, Footer, etc.)
├── styles/              # CSS Modules
├── about/               # /about page
├── projects/            # /projects page
├── contact/             # /contact page
└── page.tsx             # Home / Hero page
```

## Deployment

Deployed on [Vercel](https://vercel.com). Environment variables (`GITHUB_TOKEN`, `GITHUB_USERNAME`) must be added in the Vercel dashboard under **Settings → Environment Variables**.

---

© 2026 JackitudilinksG
