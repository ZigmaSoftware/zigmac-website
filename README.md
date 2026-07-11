# Zigfly — Zigma Global Environ Solutions Website

React + TypeScript + Vite website for Zigma Global Environ Solutions Pvt Ltd.

## Tech Stack

- **Framework**: React 18 + TypeScript 5
- **Build**: Vite 7 (SWC)
- **Styling**: Tailwind CSS 3 + shadcn/ui
- **Routing**: React Router v6
- **Animation**: Framer Motion, GSAP, Lenis
- **Forms**: React Hook Form + Zod
- **Data fetching**: TanStack React Query
- **Email**: EmailJS

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server (http://localhost:8080)
npm run dev
```

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server on port 8080        |
| `npm run build`  | Production build → `dist/`           |
| `npm run preview`| Preview production build locally     |
| `npm run lint`   | Run ESLint                           |
| `npm run lint:fix` | Run ESLint and auto-fix issues    |
| `npm run type-check` | Run TypeScript type checker     |

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

All variables must be prefixed with `VITE_` to be available in the browser.

## Project Structure

```
src/
├── components/        # Shared UI components
│   ├── animation/     # Scroll & reveal animation wrappers
│   ├── home/          # Homepage section components
│   ├── ui/            # shadcn/ui primitives
│   └── ErrorBoundary.tsx
├── features/
│   └── projects/      # Projects feature module (components, hooks, utils, types)
├── pages/             # Route-level page components
├── data/              # Static data files
├── hooks/             # Shared custom hooks
├── lib/               # Utility functions (cn, motion helpers)
└── assets/            # Images, icons, fonts, PDFs
```

## Deployment

Deployed to **Vercel**. The [`vercel.json`](vercel.json) rewrites all routes to `index.html` for SPA routing.

Build output goes to `dist/`. Run `npm run build` before deploying manually.
