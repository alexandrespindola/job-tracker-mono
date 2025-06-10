# 🇩🇪 Job Tracker - German Job Search Platform

A modern full-stack job search application that aggregates job listings from the German Federal Employment Agency (Bundesagentur für Arbeit) API. Built with React, Hono, and TypeScript in a monorepo architecture.

## 🚀 Features

- **Real-time Job Search**: Search for jobs across Germany using the official German employment API
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Fast Backend**: High-performance API built with Hono framework
- **Type Safety**: Full TypeScript support with shared types across the stack
- **Monorepo Structure**: Organized codebase with shared packages and clear separation of concerns

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

## 🌐 Environment Variables

Create a `.env` file in the frontend directory for custom configuration:

```env
VITE_API_URL=http://localhost:3001
```

## 🧪 Development Scripts

```bash
# Install dependencies
bun install

# Start development servers
bun run dev

# Build all packages
bun run build

# Clean build artifacts
bun run clean

# Build shared package only
cd packages/shared && bun run build

# Build backend only
cd apps/backend && bun run build

# Build frontend only
cd apps/frontend && bun run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Bundesagentur für Arbeit](https://www.arbeitsagentur.de/) for providing the job search API
- [Hono](https://hono.dev/) for the excellent web framework
- [Bun](https://bun.sh/) for the fast JavaScript runtime

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for the German job market**
