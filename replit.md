# Overview

This is a French massage therapist business website (Christine Do-Duc) built as a full-stack web application. The application allows clients to view massage services, book appointments, and contact the therapist. It features a professional, calming design with a sage green and cream color palette that reflects the wellness industry aesthetic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color variables for branding
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe forms

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas shared between client and server
- **Development**: In-memory storage implementation for development/demo purposes

## Data Storage
- **Database**: PostgreSQL (configured via Drizzle config)
- **Connection**: Neon Database serverless driver
- **Schema**: Shared TypeScript schemas using Drizzle and Zod
- **Tables**: Users, services, appointments, contact messages
- **Development Storage**: In-memory storage class for rapid prototyping

## API Design
- **Architecture**: RESTful API with Express routes
- **Endpoints**: 
  - GET /api/services - Retrieve massage services
  - GET /api/appointments/availability/:date - Check time slot availability
  - POST /api/appointments - Create new appointment
  - POST /api/contact - Submit contact form
- **Validation**: Server-side validation using shared Zod schemas
- **Error Handling**: Centralized error middleware with structured responses

## Key Features
- **Appointment Booking**: Calendar-based scheduling with time slot management
- **Service Catalog**: Display of massage services with descriptions and pricing
- **Contact System**: Contact form for general inquiries
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Accessibility**: Semantic HTML and ARIA support through Radix UI

## Development Setup
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Development Server**: Concurrent frontend and backend with HMR
- **Type Safety**: Strict TypeScript configuration with path mapping
- **Code Quality**: ESLint and TypeScript checking

# External Dependencies

## UI and Styling
- **@radix-ui/***: Comprehensive UI primitive components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

## Data and State Management
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation

## Development Tools
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling for Replit

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class composition
- **wouter**: Lightweight React router
- **embla-carousel-react**: Touch-friendly carousel component