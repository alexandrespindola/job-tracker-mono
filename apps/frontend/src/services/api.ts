import type { JobResponse, JobSearchParams } from '../../../../packages/shared/src/types'

class JobAPI {
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  async searchJobs(params: Partial<JobSearchParams> = {}): Promise<JobResponse> {
    const queryParams = new URLSearchParams({
      was: params.was || 'junior entwickler',
      wo: params.wo || 'koln',
      page: (params.page || 1).toString(),
      size: (params.size || 25).toString()
    })

    const response = await fetch(`${this.baseURL}/api/jobs?${queryParams}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs')
    }
    
    return response.json()
  }
}

export const jobAPI = new JobAPI()
