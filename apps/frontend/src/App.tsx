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
          <p className="font-display font-light mb-4">
            Made with ❤️ by <span className="text-german-gold font-medium">Alexandre Spindola</span> for the German tech job market
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center items-center space-x-6 mb-4 footer-fade-in">
            {/* GitHub */}
            <a 
              href="https://github.com/alexandrespindola/job-tracker-mono" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-german-gold transition-colors duration-200 group social-link px-3 py-2 rounded-lg"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </a>

            {/* Portfolio */}
            <a 
              href="https://spindola.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-german-gold transition-colors duration-200 group social-link px-3 py-2 rounded-lg"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-sm font-medium">Portfolio</span>
            </a>

            {/* XING */}
            <a 
              href="https://www.xing.com/profile/Alexandre_Spindola" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-german-gold transition-colors duration-200 group social-link px-3 py-2 rounded-lg"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.663-.962-.663H3.648v.02z"/>
              </svg>
              <span className="text-sm font-medium">XING</span>
            </a>
          </div>

          {/* German Flag */}
          <div className="flex justify-center space-x-1">
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
