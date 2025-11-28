# Design Guidelines: Premium Developer Apparel E-Commerce

## Design Approach
**Reference-Based Approach** drawing from:
- **E-commerce**: Shopify premium stores, Nike's digital experiences for product showcases
- **Tech aesthetic**: Linear's clean minimalism, Vercel's futuristic edge
- **Premium streetwear**: Bold typography, statement pieces, editorial layouts

**Core Principles**: Futuristic professionalism, playful sophistication, tech-forward luxury

## Typography
- **Primary**: Inter or Space Grotesk (modern, tech-forward) - 400, 500, 600, 700 weights
- **Accent/Headings**: JetBrains Mono or Fira Code (monospace for developer authenticity)
- **Hierarchy**: 
  - Hero headlines: 4xl-6xl (48-60px), bold, monospace
  - Section headers: 2xl-3xl (30-36px), semibold
  - Product titles: xl-2xl (20-24px), medium
  - Body: base-lg (16-18px), regular
  - Code snippets/clever copy: sm-base (14-16px), monospace

## Layout System
**Spacing**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-10 to py-16 (mobile)
- Card spacing: p-6 to p-8
- Element gaps: gap-4, gap-6, gap-8

**Grid System**:
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Featured sections: 2-column splits (60/40 or 50/50)
- Max-width containers: max-w-7xl for full sections, max-w-4xl for content

## Core Components

### Navigation
- Sticky header with glassmorphism effect (backdrop-blur)
- Logo (monospace brand name), category links, search icon, cart icon, account
- Mobile: Hamburger menu with slide-in panel

### Hero Section
- Full-viewport hero (min-h-screen) with diagonal split or geometric overlay
- Large background image showcasing featured product on model
- Animated headline with gradient text effect
- Primary CTA with blurred background, secondary link
- Floating geometric shapes (subtle parallax)

### Product Cards
- Image with hover zoom effect
- Product name (medium weight)
- Clever tagline in monospace (smaller, muted)
- Price with strikethrough for sales
- Quick-add button appearing on hover
- Glassmorphism badge for "New" or category tags

### Product Detail Page
- Large image gallery (main image + 3-4 thumbnails, click to expand)
- Product info sidebar: name, price, size selector (S/M/L/XL/XXL as pills), color variants (circular swatches)
- Clever description with code-style formatting for puns
- "Add to Cart" prominent CTA
- Accordion sections: Description, Sizing Guide, Care Instructions

### Shopping Cart
- Slide-in panel from right
- Product thumbnail, name, size, quantity stepper, remove button
- Running subtotal, shipping estimate
- "Checkout" CTA at bottom

### Footer
- 4-column layout: About, Shop by Category, Support, Newsletter signup
- Social links with icon buttons
- Trust badges (secure payment, returns)
- Monospace copyright with clever tech reference

## Animations & Interactions
**Principle**: Smooth, purposeful, futuristic - not overwhelming

- **Hero**: Gentle parallax scroll, gradient shifts, floating elements with subtle movement
- **Product cards**: Transform scale(1.02) on hover, fade-in on scroll
- **Page transitions**: Fade with slight slide-up (200-300ms)
- **Cart**: Slide animation with backdrop fade
- **Micro-interactions**: Button ripple effects, hover state transitions (150ms ease)
- **Loading states**: Skeleton screens with shimmer effect

## Special Features
- **Glassmorphism panels**: backdrop-blur-lg with semi-transparent backgrounds for featured sections
- **Gradient accents**: Apply to headlines, CTAs, and decorative elements
- **Code blocks**: Format clever product descriptions as code snippets with syntax highlighting style
- **Grid patterns**: Subtle dot or line grids as background textures
- **Cursor effects**: Custom cursor trail or glow on desktop (optional based on performance)

## Images
- **Hero**: Full-width, high-quality lifestyle shot of person wearing featured product (developer in hoodie at modern workspace), apply subtle gradient overlay
- **Product catalog**: Clean white/light gray background product shots, consistent lighting
- **Category headers**: Editorial-style banner images for each profession category
- **About section**: Team/workspace photos with futuristic color grading

## Page-Specific Layouts

### Homepage
1. Hero with featured product
2. Category grid (3-4 cards): Developer, Medical, Engineering, Coming Soon
3. Featured products carousel/grid (8-12 items)
4. Split section: Brand story (text) + lifestyle image
5. Social proof: Customer photos grid or testimonials
6. Newsletter signup with benefits

### Shop/Catalog
- Filter sidebar: Categories, Size, Price range
- Sort dropdown: Featured, New, Price (low-high)
- Product grid with pagination or infinite scroll

### Checkout
- Multi-step progress indicator
- Form sections with clear labels, validation states
- Order summary sticky panel
- Trust badges near payment area

**Viewport Strategy**: Hero uses 90vh, content sections use natural height with py-16/py-20, no forced viewport constraints on catalog/detail pages