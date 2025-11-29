# DebugWear E-Commerce Platform

## Overview

DebugWear is a premium e-commerce platform specializing in developer and professional apparel. The platform features clever wordplay-based designs targeting developers, medical professionals, engineers, and designers. Built with a modern tech stack, it emphasizes a futuristic, tech-forward aesthetic with premium streetwear sensibilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query for server state management and caching

**UI & Styling**
- Tailwind CSS for utility-first styling with custom design system
- shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Framer Motion for animations and transitions
- Custom theme system with dark/light mode support via context
- Design tokens for colors, spacing, and typography defined in Tailwind config

**State Management**
- React Context API for cart management and theme preferences
- Local storage persistence for cart state
- TanStack Query for API data caching and synchronization

**Key Design Principles**
- Component-driven architecture with reusable UI primitives
- Responsive design with mobile-first approach
- Accessibility through Radix UI primitives
- Performance optimization through code splitting and lazy loading

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API endpoints
- Node.js runtime with ES modules
- TypeScript for type safety across the stack

**API Design**
- RESTful API architecture
- Product catalog endpoints (`/api/products`)
- Shopping cart management endpoints
- Order processing endpoints
- Query parameter filtering for products (category, featured, new)

**Data Layer**
- In-memory storage pattern (currently using server/storage.ts)
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Schema definitions shared between client and server (`shared/schema.ts`)
- Zod for runtime validation and type inference

**Build & Deployment**
- Custom build script bundling client and server separately
- Server-side rendering of index.html in production
- Static asset serving from dist/public
- Environment-specific configuration (development vs production)

### Data Models

**Product Schema**
- Product metadata: id, name, tagline, description
- Pricing: price, originalPrice for sales
- Categorization: category (developer/medical/engineering/designer), type (t-shirt/hoodie/etc)
- Variants: colors array, sizes array
- Media: images array
- Flags: featured, new, inStock

**Cart Schema**
- Cart items with productId, quantity, size, color
- Local storage persistence
- Real-time subtotal calculation

**Order Schema**
- Customer information: email, name, address details
- Shipping address fields
- Payment intent integration (prepared for Stripe)

### External Dependencies

**Database**
- Neon Serverless PostgreSQL (configured but data currently in-memory)
- Connection via `@neondatabase/serverless` driver
- Drizzle ORM for type-safe queries
- Migration system via drizzle-kit

**Third-Party Services**
- Stripe integration prepared (imports present in dependencies)
- Font delivery via Google Fonts (Space Grotesk, JetBrains Mono, Inter)

**Development Tools**
- Replit-specific plugins for runtime error overlays and dev tooling
- ESBuild for server bundling with selective dependency inclusion
- TypeScript compilation without emit (type checking only)

**Session Management**
- Express-session with PostgreSQL store (connect-pg-simple)
- Prepared for authentication flows

### Type Safety Strategy

**Shared Schema Pattern**
- Central schema definitions in `shared/schema.ts`
- Zod schemas for runtime validation
- TypeScript types derived from Zod schemas
- Shared types between client and server prevent drift

**Path Aliases**
- `@/` for client source files
- `@shared/` for shared types and schemas
- `@assets/` for static assets

### Development Workflow

**Hot Module Replacement**
- Vite dev server with HMR for instant client updates
- Express server restart on file changes via tsx watch mode
- Separate client and server build processes

**Code Organization**
- Monorepo structure with client/, server/, and shared/ directories
- Component colocation (UI components in client/src/components/)
- Page-based routing structure (client/src/pages/)
- Centralized API client utilities (client/src/lib/)