# 🇩🇪 Job Tracker - German Job Search Platform

[![Netlify Deploy](https://img.shields.io/badge/Netlify-Deployed-brightgreen)](https://german-job-tracker.netlify.app)
[![Railway Deploy](https://img.shields.io/badge/Railway-Deployed-brightgreen)](https://job-tracker-mono-production.up.railway.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.2-orange)](https://bun.sh/)

A modern full-stack job search application that aggregates job listings from the German Federal Employment Agency (Bundesagentur für Arbeit) API. Built with React, Hono, and TypeScript in a monorepo architecture.

## 🌐 **Live Demo**

**🚀 [View Application](https://german-job-tracker.netlify.app)**

- **Frontend**: [https://german-job-tracker.netlify.app](https://german-job-tracker.netlify.app)
- **Backend API**: [https://job-tracker-mono-production.up.railway.app](https://job-tracker-mono-production.up.railway.app)

## 🚀 Features

- **Real-time Job Search**: Search for jobs across Germany using the official German employment API
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Backend**: High-performance API built with Hono framework
- **Type Safety**: Full TypeScript support with shared types across the stack
- **Monorepo Structure**: Organized codebase with shared packages and clear separation of concerns
- **Skeleton Loading**: Professional loading states for better UX
- **Error Handling**: Robust error handling and user feedback

## 🏗️ Architecture

This is a monorepo containing:

- **Frontend** (`apps/frontend`): React + Vite + TypeScript + Tailwind CSS
- **Backend** (`apps/backend`): Hono + Bun + TypeScript
- **Shared** (`packages/shared`): Common types and utilities

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework

### Backend

- **Hono** - Fast, lightweight web framework
- **Bun** - JavaScript runtime and package manager
- **TypeScript** - Full type safety

### API Integration

- **German Federal Employment Agency API** - Official job listings from Bundesagentur für Arbeit

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)
- Node.js 18+ (as fallback)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-tracker-mono
   ```
2. **Install dependencies**

   ```bash
   bun install
   ```
3. **Build shared packages**

   ```bash
   bun run build
   ```

### Development

1. **Start both frontend and backend in development mode**

   ```bash
   bun run dev
   ```

   This will start:

   - Backend server at `http://localhost:3001`
   - Frontend development server at `http://localhost:5173`
2. **Or run services individually**

   ```bash
   # Backend only
   cd apps/backend
   bun run dev

   # Frontend only  
   cd apps/frontend
   bun run dev
   ```

### Building for Production

1. **Build all packages**

   ```bash
   bun run build
   ```
2. **Clean build artifacts**

   ```bash
   bun run clean
   ```

## 🌐 **Deployment**

This application is deployed using modern cloud platforms:

### **Frontend Deployment (Netlify)**

- **Platform**: [Netlify](https://netlify.com)
- **URL**: [https://german-job-tracker.netlify.app](https://german-job-tracker.netlify.app)
- **Auto-deploy**: Triggers on changes to `apps/frontend/` or `packages/shared/`
- **Build Command**: `cd packages/shared && bun run build && cd ../../apps/frontend && bun install && bun run build`

### **Backend Deployment (Railway)**

- **Platform**: [Railway](https://railway.app)
- **URL**: [https://job-tracker-mono-production.up.railway.app](https://job-tracker-mono-production.up.railway.app)
- **Auto-deploy**: Triggers on changes to `apps/backend/` or `packages/shared/`
- **Runtime**: Bun + TypeScript

### **Environment Variables**

```bash
# Frontend (.env)
VITE_API_URL=https://job-tracker-mono-production.up.railway.app

# Backend (automatically provided by Railway)
PORT=3001
NODE_ENV=production
```

## 📁 Project Structure

```
job-tracker-mono/
├── apps/
│   ├── backend/          # Hono API server
│   │   ├── src/
│   │   │   └── index.ts  # Main server file
│   │   └── package.json
│   └── frontend/         # React application
│       ├── src/
│       │   ├── components/
│       │   ├── services/
│       │   └── App.tsx
│       └── package.json
├── packages/
│   └── shared/           # Shared types and utilities
│       ├── src/
│       │   ├── types.ts  # Common TypeScript types
│       │   └── index.ts
│       └── package.json
├── package.json          # Root package with workspace config
└── bun.lock             # Lockfile
```

## 🔧 API Endpoints

### GET `/api/jobs`

Search for jobs in Germany.

**Query Parameters:**

- `was` (string): Job title or keywords (default: "junior entwickler")
- `wo` (string): Location (default: "koln")
- `page` (number): Page number (default: 1)
- `size` (number): Results per page (default: 25)

**Example:**

```bash
curl "http://localhost:3001/api/jobs?was=developer&wo=berlin&page=1&size=10"
```

**Response:**

```json
{
  "stellenangebote": [
    {
      "refnr": "123456",
      "titel": "Software Developer",
      "beruf": "Developer",
      "arbeitgeber": "Company Name",
      "arbeitsort": {
        "ort": "Berlin",
        "region": "Berlin"
      },
      "aktuelleVeroeffentlichungsdatum": "2024-01-15",
      "externeUrl": "https://..."
    }
  ],
  "maxErgebnisse": 150,
  "page": 1,
  "size": 10
}
```

## 📱 **Features Showcase**

### **Responsive Design**

- **Desktop**: 3-column grid layout for optimal job browsing
- **Tablet**: 2-column layout for comfortable viewing
- **Mobile**: Single-column layout with optimized touch interactions

### **Modern UX**

- **Skeleton Loading**: Professional loading placeholders instead of spinners
- **Hover Effects**: Subtle animations for better interactivity
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Real-time Data**: Live job listings from German employment agency

### **Performance Optimizations**

- **Vite Build**: Lightning-fast development and production builds
- **Code Splitting**: Optimized bundle sizes for faster loading
- **CDN Assets**: Cached static assets for improved performance
- **Monorepo**: Shared types eliminate API mismatches

## 🌐 Environment Variables

Create a `.env` file in the frontend directory for custom configuration:

```env
VITE_API_URL=http://localhost:3001
```

## 🧪 Development Scripts

```bash
# Install dependencies
bun install

# Start development servers (both frontend and backend)
bun run dev

# Build all packages
bun run build

# Clean build artifacts
bun run clean

# Individual package commands
cd packages/shared && bun run build    # Build shared types
cd apps/backend && bun run dev         # Backend development
cd apps/frontend && bun run dev        # Frontend development
```

## 🏗️ **Monorepo Architecture**

This project uses a modern monorepo structure with workspace dependencies:

```
job-tracker-mono/
├── 📦 packages/shared/     # Shared TypeScript types and utilities
├── 🖥️  apps/frontend/      # React application (Vite + TypeScript)
├── ⚡ apps/backend/       # Hono API server (Bun + TypeScript)
├── 🚀 netlify.toml        # Frontend deployment config
├── 🛤️  railway.toml        # Backend deployment config
└── 📋 package.json        # Root workspace configuration
```

### **Workspace Benefits:**

- **Shared Types**: Common interfaces prevent API mismatches
- **Atomic Changes**: Update types in one place, affects both apps
- **Simplified Deps**: Shared dependencies reduce bundle size
- **Type Safety**: Full end-to-end TypeScript coverage

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow TypeScript best practices
   - Ensure tests pass (if applicable)
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Development Guidelines:**

- Use TypeScript for all new code
- Follow existing code style and patterns
- Test changes locally before submitting
- Update README if adding new features

## 🙏 Acknowledgments

- **[Bundesagentur für Arbeit](https://www.arbeitsagentur.de/)** - Official German job search API
- **[Hono](https://hono.dev/)** - Ultra-fast web framework for the backend
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Railway](https://railway.app/)** - Modern deployment platform
- **[Netlify](https://netlify.com/)** - Frontend hosting and deployment

## 📞 Support & Links

- **🌐 Live Demo**: [https://german-job-tracker.netlify.app](https://german-job-tracker.netlify.app)
- **📊 Backend API**: [https://job-tracker-mono-production.up.railway.app](https://job-tracker-mono-production.up.railway.app)
- **🐛 Issues**: [GitHub Issues](https://github.com/alexandrespindola/job-tracker-mono/issues)
- **📧 Contact**: Open an issue for questions or feedback

---

**🇩🇪 Made with ❤️ for the German tech job market**

*Find your next opportunity in Deutschland! 🚀*
