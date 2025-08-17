# Overview

This is a modern web application for buying and selling Apple products across Indonesian cities. The platform serves as a marketplace where users can browse available Apple devices by city, get instant price quotes for selling their devices, and contact sellers through WhatsApp integration. The application features a dark theme with electric yellow accents, creating a premium brand experience for Apple product transactions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React and TypeScript using Vite as the build tool. The application follows a component-based architecture with shadcn/ui components for consistent UI elements. Key architectural decisions include:

- **Routing**: Uses Wouter for lightweight client-side routing with pages for Home, Buy, Sell, and Contact
- **State Management**: React Query (TanStack Query) for server state management and caching, with local state handled by React hooks
- **Styling**: Tailwind CSS with a custom dark theme featuring electric yellow accent colors, configured for a premium Apple-focused brand
- **Component Library**: shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
The backend uses Express.js with TypeScript in ESM module format. The architecture follows RESTful principles with:

- **API Design**: RESTful endpoints for cities, categories, products, sell prices, and stats
- **Storage Layer**: Abstracted storage interface (IStorage) with in-memory implementation for development, designed to easily swap for database implementations
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Vite integration for hot module replacement in development mode

## Data Storage
Currently uses in-memory storage with a well-defined interface that can be easily replaced with a database implementation:

- **Database Schema**: Drizzle ORM schema definitions for PostgreSQL with tables for cities, categories, products, sell_prices, and stats
- **Migration Support**: Drizzle Kit configured for database migrations and schema management
- **Connection**: Configured for Neon serverless PostgreSQL database

## External Dependencies

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL database service
- **Drizzle Kit**: Database migration and introspection tools

### UI and Styling
- **Radix UI**: Comprehensive collection of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom dark theme
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Utility for managing component variants

### Communication Integration
- **WhatsApp Integration**: Direct messaging integration for customer contact and sales inquiries

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across the entire application
- **React Query**: Server state management and caching
- **React Hook Form**: Performant form library with validation
- **Zod**: Runtime type validation and schema definition

### Hosting and Deployment
- **Replit**: Development and hosting platform with built-in deployment capabilities
- **ESBuild**: Fast JavaScript bundler for production builds