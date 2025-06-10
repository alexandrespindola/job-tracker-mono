import { Hono } from 'hono'
import { handle } from 'hono/netlify'
import type { JobResponse, JobSearchParams } from '@job-tracker/shared'

const app = new Hono()

// Health check
app.get('/', (c) => c.json({ message: 'Job Tracker API running! 🚀' }))

// API para buscar vagas alemãs
app.get('/api/jobs', async (c) => {
  const params: JobSearchParams = {
    was: c.req.query('was') || 'junior entwickler',
    wo: c.req.query('wo') || 'koln',
    page: parseInt(c.req.query('page') || '1'),
    size: parseInt(c.req.query('size') || '25')
  }

  try {
    const queryString = new URLSearchParams({
      was: params.was,
      wo: params.wo,
      page: params.page.toString(),
      size: params.size.toString()
    })

    const response = await fetch(
      `https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/app/jobs?${queryString}`,
      {
        headers: {
          'X-API-Key': 'jobboerse-jobsuche',
          'Accept': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data: JobResponse = await response.json()
    return c.json(data)
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return c.json({ 
      error: 'Failed to fetch jobs',
      stellenangebote: [],
      maxErgebnisse: 0,
      page: params.page,
      size: params.size
    }, 500)
  }
})

export const handler = handle(app)
