import type { JobResponse, JobSearchParams } from '@job-tracker/shared'

class JobAPI {
  private baseURL = '/api'

  async searchJobs(params: Partial<JobSearchParams> = {}): Promise<JobResponse> {
    const queryParams = new URLSearchParams({
      was: params.was || 'junior entwickler',
      wo: params.wo || 'koln',
      page: (params.page || 1).toString(),
      size: (params.size || 25).toString()
    })

    const response = await fetch(`${this.baseURL}/jobs?${queryParams}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs')
    }
    
    return response.json()
  }
}

export const jobAPI = new JobAPI()
