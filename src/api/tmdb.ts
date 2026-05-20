import { TMDB_CONFIG } from '@/config/tmdb'
import type { Movie, MovieDetail } from '@/types'

type FetchOptions = RequestInit & {
  signal?: AbortSignal
}

async function fetchFromTMDB<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const controller = new AbortController()

  const timeout = setTimeout(() => {
    controller.abort()
  }, TMDB_CONFIG.requestTimeout)

  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseUrl}${endpoint}${
        endpoint.includes('?') ? '&' : '?'
      }api_key=${TMDB_CONFIG.apiKey}`,
      {
        ...options,
        signal: options.signal ?? controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout or aborted', { cause: error })
    }

    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export async function getTrending(): Promise<Movie[]> {
  const data = await fetchFromTMDB<{ results: Movie[] }>('/trending/movie/week')

  return data.results
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<{ results: Movie[] }>(
    `/search/movie?query=${encodeURIComponent(query)}`,
  )

  return data.results
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  return fetchFromTMDB<MovieDetail>(`/movie/${id}`)
}
