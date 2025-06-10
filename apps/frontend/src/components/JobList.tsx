import { useState, useEffect } from 'react'
import type { Job } from '../../../../packages/shared/src/types'
import { jobAPI } from '../services/api'

// Magnetic Card Component with advanced interactions
const MagneticCard = ({ children, className = "", ...props }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const maxDistance = 15 // Maximum magnetic pull distance
    const magneticStrength = 0.15 // How strong the magnetic effect is
    
    setMousePosition({
      x: (e.clientX - centerX) * magneticStrength,
      y: (e.clientY - centerY) * magneticStrength
    })
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }
  
  return (
    <div 
      className={`transform-gpu transition-all duration-300 ease-out ${className}`}
      style={{ 
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}

// Skeleton loading component
const JobSkeleton = () => (
  <div className="glass-card animate-pulse">
    <div className="p-6">
      <div className="h-6 bg-white/10 rounded-lg w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
        <div className="h-4 bg-white/10 rounded w-2/3"></div>
        <div className="h-4 bg-white/10 rounded w-1/3"></div>
        <div className="h-3 bg-white/10 rounded w-1/4 mt-4"></div>
      </div>
      <div className="h-10 bg-white/10 rounded-lg w-28 mt-6"></div>
    </div>
  </div>
)

// Pagination component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading 
}: { 
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading: boolean
}) => {
  const getVisiblePages = (): (number | string)[] => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-3 mt-12">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-dark-800 border border-dark-600 rounded-lg hover:bg-dark-700 hover:border-german-gold/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        ← Previous
      </button>

      {/* Page numbers */}
      {getVisiblePages().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="px-3 py-2 text-sm font-medium text-gray-500">
              ...
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed ${
              isActive
                ? 'bg-german-red text-white border border-german-red shadow-lg'
                : 'text-gray-300 bg-dark-800 border border-dark-600 hover:bg-dark-700 hover:border-german-gold/50'
            }`}
          >
            {pageNum}
          </button>
        )
      })}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-dark-800 border border-dark-600 rounded-lg hover:bg-dark-700 hover:border-german-gold/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next →
      </button>
    </div>
  )
}

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true) // Start with true for initial load
  const [totalJobs, setTotalJobs] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showJobs, setShowJobs] = useState(false) // Control when to show jobs after animation
  
  // Filter states
  const [searchFilters, setSearchFilters] = useState({
    was: 'entwickler',
    wo: 'koln'
  })
  const [tempFilters, setTempFilters] = useState(searchFilters)
  
  const pageSize = 20
  const totalPages = Math.ceil(totalJobs / pageSize)

  const fetchJobs = async (page: number = 1, filters = searchFilters) => {
    // Show skeleton only on initial load or filter change
    if ((page === 1 && jobs.length === 0) || filters !== searchFilters) {
      setLoading(true)
    } else {
      setIsLoadingMore(true)
      setShowJobs(false) // Hide jobs during pagination
    }
    
    try {
      const result = await jobAPI.searchJobs({ 
        page, 
        size: pageSize,
        was: filters.was,
        wo: filters.wo
      })
      setJobs(result.stellenangebote || [])
      setTotalJobs(result.maxErgebnisse || 0)
      setCurrentPage(page)
      setSearchFilters(filters)
      
      // Show jobs after a small delay to allow for animation
      setTimeout(() => {
        setShowJobs(true)
      }, 150)
      
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
      setIsLoadingMore(false)
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchJobs(page)
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Reset to page 1 when searching
    fetchJobs(1, tempFilters)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFilterChange = (field: 'was' | 'wo', value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  useEffect(() => {
    fetchJobs(1)
  }, [])

  // Initialize showJobs when component mounts
  useEffect(() => {
    if (!loading && jobs.length > 0) {
      setShowJobs(true)
    }
  }, [loading, jobs.length])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 animate-fade-in">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <span className="text-gradient">Job Tracker</span>
          </h1>
          <p className="text-xl text-gray-300 font-light">Deutschland 🇩🇪</p>
          <div className="h-1 w-24 bg-german-red mx-auto mt-4 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <JobSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      {/* Click Pulse Effect */}
      <ClickPulse />
      
      {/* Hero Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src="/apple-touch-icon.svg" 
            alt="Job Tracker Logo" 
            className="w-12 h-12 md:w-16 md:h-16 animate-pulse-glow logo-float"
          />
          <h1 className="text-5xl md:text-6xl font-display font-bold">
            <span className="text-gradient">Job Tracker</span>
          </h1>
        </div>
        <p className="text-xl text-gray-300 font-light mb-2">Deutschland 🇩🇪</p>
        <p className="text-gray-400">Find your next opportunity in Germany's tech scene</p>
        <div className="h-1 w-24 bg-german-red mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Search Filters */}
      <div className="premium-glass p-8 mb-8 max-w-4xl mx-auto rounded-xl">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="was" className="block text-sm font-display font-medium text-gray-200">
                🔍 Job Title / Keywords
              </label>
              <input
                type="text"
                id="was"
                value={tempFilters.was}
                onChange={(e) => handleFilterChange('was', e.target.value)}
                placeholder="e.g. entwickler, developer, designer"
                className="w-full px-4 py-3 input-dark rounded-lg focus:outline-none transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="wo" className="block text-sm font-display font-medium text-gray-200">
                📍 Location
              </label>
              <input
                type="text"
                id="wo"
                value={tempFilters.wo}
                onChange={(e) => handleFilterChange('wo', e.target.value)}
                placeholder="e.g. berlin, münchen, hamburg"
                className="w-full px-4 py-3 input-dark rounded-lg focus:outline-none transition-all duration-200"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                disabled={loading || isLoadingMore}
                className="btn-primary btn-magnetic ripple pulse-glow h-12 disabled:opacity-50 disabled:cursor-not-allowed font-display"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Searching...
                  </span>
                ) : (
                  'Search Jobs 🚀'
                )}
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-dark-700/50 rounded-full text-sm text-gray-300">
              <span className="w-2 h-2 bg-german-gold rounded-full mr-2 animate-pulse"></span>
              Current search: <span className="font-medium text-german-gold mx-1">"{searchFilters.was}"</span> 
              in <span className="font-medium text-german-gold ml-1">"{searchFilters.wo}"</span>
            </div>
          </div>
        </form>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 glass-card">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-german-red rounded-full"></div>
            <span className="text-gray-200 font-display font-medium">
              {totalJobs.toLocaleString()} opportunities found
            </span>
          </div>
        </div>
        
        {totalJobs > 0 && (
          <div className="text-sm text-gray-400 flex items-center space-x-2">
            <span>Page {currentPage} of {totalPages}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{jobs.length} jobs shown</span>
          </div>
        )}
      </div>
      
      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {isLoadingMore && !showJobs ? (
          // Show skeleton during pagination
          Array.from({ length: 6 }).map((_, index) => (
            <JobSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          showJobs && jobs.map((job, index) => (
            <MagneticCard key={job.refnr} className="animate-slide-up" style={{animationDelay: `${index * 50}ms`}}>
              <div className="glass-card glow-effect p-6 h-full">
              {/* Job Header */}
              <div className="mb-4">
                <h3 className="text-xl font-display font-semibold text-gray-100 mb-2 line-clamp-2 leading-tight">
                  {job.titel}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-german-gold">
                  <span className="font-medium">{job.arbeitgeber}</span>
                </div>
              </div>
            
            {/* Job Details */}
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📍</span>
                <span>{job.arbeitsort?.ort}, {job.arbeitsort?.region}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">💼</span>
                <span>{job.beruf}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📅</span>
                <span>{new Date(job.aktuelleVeroeffentlichungsdatum).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">#</span>
                <span className="text-xs text-gray-400">{job.refnr}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {job.externeUrl ? (
                <a 
                  href={job.externeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center btn-primary btn-magnetic ripple hover-lift"
                >
                  Apply Now 🚀
                </a>
              ) : (
                <>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const searchQuery = `${job.titel} ${job.arbeitgeber} ${job.arbeitsort?.ort}`
                        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' jobs application')}`
                        window.open(googleUrl, '_blank')
                      }}
                      className="w-full px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm rounded-lg transition-all duration-200 flex items-center justify-center font-medium ripple hover-lift"
                    >
                      🔍 Search on Google
                    </button>
                    <button
                      onClick={() => {
                        const companyQuery = `${job.arbeitgeber} careers jobs`
                        const companyUrl = `https://www.google.com/search?q=${encodeURIComponent(companyQuery)}`
                        window.open(companyUrl, '_blank')
                      }}
                      className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-all duration-200 flex items-center justify-center font-medium ripple hover-lift"
                    >
                      🏢 Company Careers
                    </button>
                    <a 
                      href={`https://www.arbeitsagentur.de/jobsuche/jobdetail/${job.refnr}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-german-black text-sm rounded-lg transition-all duration-200 text-center font-medium ripple hover-lift"
                    >
                      🇩🇪 Arbeitsagentur
                    </a>
                  </div>
                </>
              )}
            </div>            </div>
          </MagneticCard>
        ))
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoadingMore}
      />
    </div>
  )
}

// Click Pulse Effect Component
const ClickPulse = () => {
  const [pulses, setPulses] = useState<Array<{id: number, x: number, y: number}>>([])
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newPulse = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      
      setPulses(prev => [...prev, newPulse])
      
      // Remove pulse after animation
      setTimeout(() => {
        setPulses(prev => prev.filter(p => p.id !== newPulse.id))
      }, 600)
    }
    
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {pulses.map(pulse => (
        <div
          key={pulse.id}
          className="absolute rounded-full border-2"
          style={{
            left: pulse.x - 20,
            top: pulse.y - 20,
            width: 40,
            height: 40,
            borderColor: '#fbbf24',
            animation: 'click-pulse 0.6s ease-out forwards'
          }}
        />
      ))}
    </div>
  )
}
