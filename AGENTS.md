<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project Overview

Build a premium real estate company website for Kedia Group from scratch.

The website should feel custom-designed, elegant, trustworthy, architectural, and production-ready. The visual identity should be inspired by the provided Kedia Group logo: deep navy, black, white, strong structure, and a professional real estate presence.

Avoid generic AI-generated aesthetics.

---

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react only when necessary

---

## Website Pages

1. Home (`/`)
2. About Us (`/about`)
3. Properties / Listings (`/properties`)
4. Property Details (`/properties/[slug]`)
5. Contact (`/contact`)
6. Careers (`/careers`)

---

## Homepage Sections

1. Navbar
2. Hero
3. Featured Properties
4. About Preview
5. Services
6. Company Stats
7. Testimonials
8. CTA Banner
9. Contact Preview
10. Footer

---

## Brand Direction

Kedia Group should feel like a serious, established, high-trust real estate company.

The design should feel:
- Premium
- Corporate but not boring
- Architectural
- Confident
- Clean
- Trustworthy
- Modern
- Image-led

The website should not feel like a generic startup landing page.

---

## Logo-Inspired Color Palette

Use a palette inspired by the Kedia Group logo.

### Primary Colors

- Primary Navy: `#063B68`
  - Use for primary buttons, nav highlights, links, section accents, and key brand moments.

- Deep Navy: `#042B4C`
  - Use for dark sections, footer backgrounds, overlays, and premium contrast areas.

- Architectural Black: `#050505`
  - Use sparingly for strong text, hero overlays, and high-contrast sections.

- Pure White: `#FFFFFF`
  - Use for clean sections, cards, navbar surfaces, and contrast.

### Neutral Colors

- Soft White: `#F7F8FA`
  - Main page background alternative to pure white.

- Cool Mist: `#EEF2F5`
  - Use for subtle section breaks and card backgrounds.

- Slate Gray: `#667085`
  - Use for secondary body text.

- Charcoal Text: `#1A1D21`
  - Use for main text on light backgrounds.

- Border Gray: `#D9DEE4`
  - Use for borders, dividers, cards, and form inputs.

### Accent Colors

- Steel Blue: `#2F6F9F`
  - Use for hover states, secondary accents, subtle gradients, and interaction details.

- Silver Shadow: `#AAB4BE`
  - Use for muted UI details, metadata, and secondary decorative elements.

### Optional Warm Accent

Use very sparingly:
- Warm Sand: `#C8A96A`
  - Only for small luxury accents, not as the main brand color.

---

## Color Usage Rules

- The website should primarily use white, soft white, deep navy, and charcoal.
- Navy should be the main brand color.
- Black should be used carefully so the site does not feel too heavy.
- Avoid large gold-heavy luxury styling. The logo is more professional and architectural than royal.
- Use Warm Sand only for small highlights if needed.
- Avoid purple, pink, neon blue, and generic SaaS gradients.
- Avoid random hex codes. Use the defined palette consistently.

---

## Design Direction

### Style

- Premium real estate
- Editorial and image-led
- Clean architectural grid
- Strong typography
- Refined corporate luxury
- Minimal but rich

### Avoid

- Generic SaaS layouts
- Purple or blue-purple gradients
- Excessive glassmorphism
- Cartoon icons
- Random decorative blobs
- Overcrowded sections
- Lorem ipsum
- Obvious AI-generated design patterns

---

## Typography

- Use large editorial headlines.
- Use strong hierarchy.
- Use generous line height.
- Headlines should feel confident and architectural.
- Body text should be elegant, readable, and concise.
- Avoid cramped layouts and tiny text.

Suggested feel:
- Headlines: bold, elegant, structured
- Body: clean, professional, easy to scan
- Labels/eyebrows: uppercase, spaced, subtle navy or slate

---

## Spacing

- Use an 8px spacing system.
- Use large vertical section padding.
- Use strong whitespace.
- Avoid dense, cluttered layouts.
- Cards should breathe.
- Premium design should feel calm and intentional.

---

## Animation Guidelines

Use Framer Motion for:

- Hero text stagger animations
- Scroll-triggered section reveals
- Subtle image parallax
- Card hover lift
- Gentle image zoom
- Smooth button hover transitions
- Mobile menu animation

Motion should feel:
- Premium
- Subtle
- Smooth
- Intentional
- Developer-level

Motion should not feel:
- Flashy
- Gimmicky
- Slow
- Distracting
- Over-animated

Respect reduced-motion preferences where reasonable.

---

## Performance Guidelines

- Keep pages server-rendered by default.
- Use client components only when interactivity or Framer Motion is required.
- Use `next/image` for major images.
- Avoid layout shift by setting image dimensions or fixed aspect ratios.
- Keep dependencies minimal.
- Avoid loading large animation libraries besides Framer Motion.
- Optimize for fast first load.
- Do not create unnecessarily heavy components.

---

## Coding Standards

- Use reusable components.
- Keep files modular and clean.
- Use TypeScript types for data models.
- Use accessible semantic HTML.
- Use mobile-first responsive design.
- Use realistic placeholder copy.
- Avoid unnecessary dependencies.
- Avoid one giant file.
- Keep forms static/presentational unless backend handling is requested.

---

## Suggested Component Structure

Use the existing project structure if already created.

Preferred structure:

```txt
app/
  about/page.tsx
  careers/page.tsx
  contact/page.tsx
  globals.css
  layout.tsx
  page.tsx
  properties/page.tsx
  properties/[slug]/page.tsx

components/
  layout/
    Footer.tsx
    Navbar.tsx

  sections/
    AboutPreview.tsx
    ContactPreview.tsx
    CTASection.tsx
    FeaturedProperties.tsx
    Hero.tsx
    Services.tsx
    Stats.tsx
    Testimonials.tsx

  ui/
    AnimatedSection.tsx
    Button.tsx
    PropertyCard.tsx
    SectionHeading.tsx

lib/
  data.ts
  utils.ts