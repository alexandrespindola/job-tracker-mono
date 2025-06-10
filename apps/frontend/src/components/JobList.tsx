import { useState, useEffect } from 'react'
import type { Job } from '../../../../packages/shared/src/types'
import { jobAPI } from '../services/api'

// Skeleton loading component
const JobSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-24 mt-3"></div>
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
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page numbers */}
      {getVisiblePages().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="px-3 py-2 text-sm font-medium text-gray-400">
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
            className={`px-3 py-2 text-sm font-medium rounded-md disabled:cursor-not-allowed ${
              isActive
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
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
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Job Tracker - Deutschland 🇩🇪
        </h1>
        <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <JobSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Job Tracker - Deutschland 🇩🇪
      </h1>

      {/* Search Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="was" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title / Keywords (Was)
              </label>
              <input
                type="text"
                id="was"
                value={tempFilters.was}
                onChange={(e) => handleFilterChange('was', e.target.value)}
                placeholder="e.g. entwickler, developer, designer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="wo" className="block text-sm font-medium text-gray-700 mb-1">
                Location (Wo)
              </label>
              <input
                type="text"
                id="wo"
                value={tempFilters.wo}
                onChange={(e) => handleFilterChange('wo', e.target.value)}
                placeholder="e.g. berlin, münchen, hamburg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || isLoadingMore}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Searching...' : 'Search Jobs'}
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <strong>Current search:</strong> "{searchFilters.was}" in "{searchFilters.wo}"
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {totalJobs} vacancies found
        </p>
        {totalJobs > 0 && (
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages} ({jobs.length} jobs shown)
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => (
          <div key={job.refnr} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {job.titel}
            </h3>
            <div className="space-y-1 text-gray-600 text-sm">
              <p><span className="font-medium">Business:</span> {job.arbeitgeber}</p>
              <p><span className="font-medium">Local:</span> {job.arbeitsort?.ort}, {job.arbeitsort?.region}</p>
              <p><span className="font-medium">Position:</span> {job.beruf}</p>
              <p className="text-xs text-gray-500">
                Published: {job.aktuelleVeroeffentlichungsdatum}
              </p>
              <p className="text-xs text-gray-500">
                Ref: {job.refnr}
              </p>
            </div>
            
            <div className="mt-3 flex flex-col gap-2">
              {job.externeUrl ? (
                <a 
                  href={job.externeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors text-center"
                >
                  Apply Now
                </a>
              ) : (
                <>
                  <div className="text-xs text-amber-600 font-medium mb-1 flex items-center">
                    ⚠️ No direct application link - Alternative options:
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        const searchQuery = `${job.titel} ${job.arbeitgeber} ${job.arbeitsort?.ort}`
                        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' jobs application')}`
                        window.open(googleUrl, '_blank')
                      }}
                      className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      🔍 Search on Google
                    </button>
                    <button
                      onClick={() => {
                        const companyQuery = `${job.arbeitgeber} careers jobs site:${job.arbeitgeber.toLowerCase().replace(/\s+/g, '')}.de OR site:${job.arbeitgeber.toLowerCase().replace(/\s+/g, '')}.com`
                        const companyUrl = `https://www.google.com/search?q=${encodeURIComponent(companyQuery)}`
                        window.open(companyUrl, '_blank')
                      }}
                      className="w-full px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      🏢 Company Careers
                    </button>
                    <a 
                      href={`https://www.arbeitsagentur.de/jobsuche/jobdetail/${job.refnr}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex w-full px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors items-center justify-center"
                    >
                      🇩🇪 View on Arbeitsagentur
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
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
