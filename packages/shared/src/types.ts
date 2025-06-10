// Types to german API
export interface Job {
  beruf: string
  titel: string
  refnr: string
  arbeitgeber: string
  arbeitsort: {
    ort: string
    region: string
    koordinaten: {
      lat: number
      lon: number
    }
  }
  aktuelleVeroeffentlichungsdatum: string
  externeUrl?: string
}

export interface JobSearchParams {
  was: string  // search term
  wo: string   // location
  page: number
  size: number
}

export interface JobResponse {
  stellenangebote: Job[]
  maxErgebnisse: number
  page: number
  size: number
}
