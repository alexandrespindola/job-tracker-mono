import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { JobResponse, JobSearchParams } from '../../../packages/shared/src/types'

const app = new Hono()

// CORS for frontend
app.use('*', cors({
  origin: (origin) => {
    // Allow localhost for development
    if (origin?.includes('localhost')) return origin
    // Allow Netlify domains
    if (origin?.includes('.netlify.app')) return origin
    // Allow Railway domains
    if (origin?.includes('.railway.app')) return origin
    // Default fallback
    return 'http://localhost:5173'
  },
  credentials: true
}))

// Health check
app.get('/', (c) => c.json({ message: 'Job Tracker API running! 🚀 23' }))

// API to fetch german job listings
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

// Bun server configuration
export default {
  port: process.env.PORT || 3001,
  fetch: app.fetch,
}
