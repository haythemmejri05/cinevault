export const TMDB_CONFIG = {
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
  requestTimeout: 10000,
} as const

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const TMDB_IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'w1280',
} as const
