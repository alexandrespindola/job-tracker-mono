import { useState, useEffect } from 'react'
import type { Job } from '../../../../packages/shared/src/types'
import { jobAPI } from '../services/api'

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [totalJobs, setTotalJobs] = useState(0)

  const fetchJobs = async () => {
    setLoading(true)
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
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading jobs...</div>
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
      
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.refnr} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {job.titel}
            </h3>
            <div className="space-y-1 text-gray-600">
              <p><span className="font-medium">Business:</span> {job.arbeitgeber}</p>
              <p><span className="font-medium">Local:</span> {job.arbeitsort?.ort}, {job.arbeitsort?.region}</p>
              <p><span className="font-medium">Position:</span> {job.beruf}</p>
              <p className="text-sm text-gray-500">
                Published: {job.aktuelleVeroeffentlichungsdatum}
              </p>
            </div>
            
            {job.externeUrl && (
              <a 
                href={job.externeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
