import type { Movie } from '@/types'
import { MovieCard } from './MovieCard'

type MovieGridProps = {
  movies: Movie[]
  watchlistIds: number[]
  ratings: Record<number, number>
  onCardClick: (movie: Movie) => void
  onToggleWatchlist: (movie: Movie) => void
  onRate: (movieId: number, score: number) => void
}

export function MovieGrid({
  movies,
  watchlistIds,
  ratings,
  onCardClick,
  onToggleWatchlist,
  onRate,
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-600">
        No movies found.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={watchlistIds.includes(movie.id)}
          userRating={ratings[movie.id] ?? 0}
          onClick={onCardClick}
          onToggleWatchlist={onToggleWatchlist}
          onRate={onRate}
        />
      ))}
    </div>
  )
}
