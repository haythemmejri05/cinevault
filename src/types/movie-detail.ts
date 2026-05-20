import type { Movie } from './movie'
import type { MovieGenre } from './movie-genre'

export interface MovieDetail extends Movie {
  runtime: number | null
  genres: MovieGenre[]
  tagline: string | null
  status: string
  budget: number
  revenue: number
  homepage: string | null
}
