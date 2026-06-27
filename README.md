# RR Engineering Works — Website Design Prototype

A premium, modern, responsive B2B industrial website concept for **RR Engineering Works**, an industrial valve manufacturer in Kanchipuram, Tamil Nadu. This is a **frontend-only design prototype** — there is no backend, no database, and no live API calls. All content is realistic static placeholder data.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** with a custom design token system (colors, type scale, shadows, radii)
- **shadcn/ui**-style primitives (Button, Badge, Accordion) built on Radix UI
- **Framer Motion** for scroll-triggered reveals, hero entrance animation, and the mobile menu
- **Lucide React** for iconography

## Design System

| Token | Value |
|---|---|
| Primary (Industrial Blue) | `#0B4F9C` |
| Secondary (Navy) | `#0A1F33` |
| Accent (CTA Orange) | `#F2730A` |
| Display typeface | Space Grotesk |
| Body typeface | Inter |
| Data/mono typeface | JetBrains Mono |

The site's signature visual motif is a **blueprint / technical drawing language**: a faint engineering grid in the hero and Manufacturing section, corner "crop marks" on photography (like a drafting sheet registration mark), and spec-sheet style mono-font data blocks (material, pressure rating, size range) on every product card — reinforcing "engineering precision" rather than generic corporate-blue styling.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.tsx              Sticky nav, scroll-aware colors, mobile menu
    sections/                One component per homepage section
    ui/                      Reusable primitives (Button, Badge, Accordion, Reveal, ScrollProgressBar...)
  data/                      All static mock content (products, industries, certifications, FAQs, etc.)
  hooks/                     useInView (scroll reveal), useCountUp (animated counters)
  lib/utils.ts               className merge helper
```

## Notes on Placeholder Content

- Product images are referenced from Unsplash via URL, per the brief. Swap these for real factory/product photography before going live.
- The RFQ form in the Contact section is fully functional in the UI sense (validation, controlled state) but does **not** submit anywhere — there is no backend wired up, by design.
- Resource "Download" buttons show an informational alert rather than downloading a real file.
- The Google Maps panel in Contact is a static placeholder, not a live embed.
- Company details (address, phone, certifications, testimonials, client names) are illustrative placeholders matching the brief's instructions and should be replaced with verified information.

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`) and heading hierarchy throughout
- Visible focus rings on all interactive elements (`:focus-visible`)
- `aria-label`s on icon-only buttons and the mobile menu toggle
- Color contrast checked against the navy/white/orange palette
- `prefers-reduced-motion` respected — animations are disabled for users who request it
