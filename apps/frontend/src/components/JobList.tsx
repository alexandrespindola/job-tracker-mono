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

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true) // Start with true for initial load
  const [totalJobs, setTotalJobs] = useState(0)

  const fetchJobs = async () => {
    // Only set loading if we don't have jobs yet (initial load)
    if (jobs.length === 0) {
      setLoading(true)
    }
    
    try {
      const result = await jobAPI.searchJobs()
      setJobs(result.stellenangebote || [])
      setTotalJobs(result.maxErgebnisse || 0)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Job Tracker - Deutschland 🇩🇪
      </h1>
      <p className="text-gray-600 mb-6">
        {totalJobs} vacancies found
      </p>
      
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
            </div>
            
            {job.externeUrl && (
              <a 
                href={job.externeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
