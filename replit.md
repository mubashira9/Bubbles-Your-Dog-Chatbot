# DogBot Chat Application

## Overview

This is a full-stack chat application featuring "DogBot" - an AI-powered chatbot that specializes in dog-related questions and advice. The application uses a modern web stack with React frontend, Express.js backend, and integrates with OpenAI's GPT-4o model for intelligent responses.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but using memory storage currently)
- **AI Integration**: OpenAI GPT-4o for chatbot responses
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Wouter** for lightweight routing
- **TanStack Query** for efficient API state management
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling with custom color scheme
- **Custom animations** for dog avatar blinking and tongue display

### Backend Architecture
- **Express.js** server with TypeScript
- **Memory Storage** implementation for development (IStorage interface allows easy database swap)
- **Google Gemini Integration** using Gemini-2.5-flash model with specialized dog-focused prompts
- **RESTful API** design with proper error handling
- **Session-based** chat management with unique session IDs

### Database Schema
- **Users table**: Basic user management (username, password)
- **Chat Messages table**: Stores conversation history with session tracking
- **Drizzle ORM** with PostgreSQL dialect configured
- **Type-safe** database operations using Drizzle-Zod integration

### UI/UX Design
- **Sky-blue theme** with dog emoji background pattern
- **Responsive design** with mobile-first approach  
- **Custom color palette** featuring sky blue background with dog-friendly colors
- **Animated elements** including cartoon dog avatars with blinking and tongue animations
- **Paw-shaped send button** for interactive messaging

## Data Flow

1. **User Input**: Messages entered through MessageInput component
2. **API Request**: POST to `/api/chat` with session ID and message content
3. **Message Storage**: User message saved to memory storage
4. **AI Processing**: Google Gemini API called with specialized dog-bot prompt
5. **Response Storage**: Bot response saved to memory storage
6. **Client Update**: TanStack Query invalidates cache and fetches updated messages
7. **UI Render**: Chat interface displays new messages with smooth scrolling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection (configured for future use)
- **drizzle-orm**: Type-safe database ORM
- **@google/genai**: Google Gemini AI client
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundling

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Type Checking**: TypeScript compilation for error detection

### Environment Configuration
- **Development**: Uses tsx for hot-reloading TypeScript execution
- **Production**: Node.js serves bundled JavaScript
- **Database**: Configured for PostgreSQL via DATABASE_URL environment variable
- **Google Gemini**: Requires GEMINI_API_KEY environment variable

### Key Features for Deployment
- **Memory Storage**: Currently uses in-memory storage for development
- **Database Ready**: Drizzle configuration ready for PostgreSQL deployment
- **Static Asset Serving**: Express serves Vite-built frontend in production
- **Error Handling**: Comprehensive error boundaries and API error responses
- **CORS**: Configured for cross-origin requests
- **Session Management**: Unique session IDs for chat isolation

The application is designed to be easily deployable to platforms like Replit, Vercel, or Railway with minimal configuration changes needed for the database connection.