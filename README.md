# Converted Next.js Project

This repository wraps your original React application inside **Next.js 14 (App Router)** while preserving all client-side functionality.

## How it works
- Your original source was copied to **/spa**.
- A client component **app/SPAApp.tsx** mounts your original `<App />` inside a React Router `<BrowserRouter>`, so routes and behavior are unchanged.
- All non-module CSS was concatenated into **app/globals.css** (Next requires global CSS to be imported from the root layout). CSS Modules (`*.module.css`) still work where they were.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm start
```

## Next steps (optional, for a full-native migration)
1. Incrementally move routes from React Router into the Next **/app** directory (e.g., `app/about/page.tsx`, `app/blog/[slug]/page.tsx`).
2. Replace `<Link>` from `react-router-dom` with `next/link` for pages you migrate.
3. Move data fetching into Server Components where applicable.
4. Gradually delete the corresponding bits from `/spa` as you port them.

---

### Notes
- Original dependencies were merged, with CRA/Vite build-time packages removed. We ensured `next`, `react`, `react-dom`, and `react-router-dom` are present.
- Public assets were copied to **/public**.
- If some CSS/asset paths rely on bundler-specific behavior, adjust them or keep them inside `/spa` until you port that part.

Enjoy your Next.js app!

## Tailwind CSS

This project is preconfigured for Tailwind.

Install deps (if you haven't already):
```bash
npm install
# (devDependencies include tailwindcss, postcss, autoprefixer)
```

You can now use Tailwind classes in any component under `app/`, `components/`, or `spa/`.
Tailwind scans these folders per `tailwind.config.js`.
