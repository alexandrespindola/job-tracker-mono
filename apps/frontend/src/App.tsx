import { JobList } from './components/JobList'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-german-subtle relative overflow-hidden">
      {/* Glassmorphism Background with Particles */}
      <div className="glass-bg fixed inset-0 -z-10"></div>
      
      {/* German Flag Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-german-black via-german-red to-german-gold z-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <JobList />
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-dark-700 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p className="font-display font-light">
            Made with ❤️ for the German tech job market
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            <span className="w-4 h-3 bg-german-black rounded-sm"></span>
            <span className="w-4 h-3 bg-german-red rounded-sm"></span>
            <span className="w-4 h-3 bg-german-gold rounded-sm"></span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
