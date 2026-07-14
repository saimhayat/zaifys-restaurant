# Zaify's Restaurant — Website

A premium, production-ready website for Zaify's Restaurant (Satellite Town, Rawalpindi), built with React + Vite, plain JavaScript, and external CSS only.

## Tech stack

- React 19 + Vite (SWC-powered `@vitejs/plugin-react`)
- Plain JavaScript (no TypeScript)
- External CSS per component (no Tailwind/Bootstrap/UI kits)
- React Router
- Zero UI/animation dependencies — all motion is CSS + a tiny IntersectionObserver hook

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/       One folder per component, each with its own .css file
  pages/            Home.jsx (assembles all sections) and NotFound.jsx
  data/             Menu items, gallery, testimonials, stats, restaurant info
  hooks/            useReveal (scroll animations), useCountUp (animated stats)
  utils/            scrollTo helper
  styles/           global.css — design tokens (colors, type, spacing) + resets
public/
  favicon.svg, robots.txt, sitemap.xml
```

## Notes

- Images are loaded from Unsplash at render time (lazy-loaded, responsive `srcset`-ready URLs). Swap in real restaurant photography before launch by replacing the URLs in `src/data/menuData.js` and `src/data/siteData.js`.
- The Google Maps embed and phone/WhatsApp links in `src/data/siteData.js` use placeholder/real contact details — double check before going live.
- Update the canonical URL and Open Graph image in `index.html` once the site has a real domain.
- All interactive sections (menu filters, gallery lightbox, reservation form, testimonials carousel, animated stats) are dependency-free — built with hooks and the Intersection Observer / requestAnimationFrame browser APIs.
