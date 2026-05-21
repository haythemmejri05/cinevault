import { memo } from 'react'
import type { Movie } from '@/types'
import { Button } from '@/components/shared'
import { StarRating } from './StarRating'

type MovieCardProps = {
  movie: Movie
  isInWatchlist: boolean
  userRating?: number
  onClick?: (movie: Movie) => void
  onToggleWatchlist: (movie: Movie) => void
  onRate: (movieId: number, score: number) => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieCardComponent({
  movie,
  isInWatchlist,
  userRating = 0,
  onClick,
  onToggleWatchlist,
  onRate,
}: MovieCardProps) {
  const posterUrl = movie.posterPath ? `${IMAGE_BASE_URL}${movie.posterPath}` : null

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <button type="button" onClick={() => onClick?.(movie)} className="block w-full text-left">
        <div className="aspect-[2/3] w-full bg-gray-100">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-500">
              No poster available
            </div>
          )}
        </div>
      </button>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{movie.title}</h3>

          <p className="mt-1 text-sm text-gray-600">TMDB rating: {movie.voteAverage.toFixed(1)}</p>
        </div>

        <StarRating value={userRating} onRate={(score) => onRate(movie.id, score)} />

        <Button
          variant={isInWatchlist ? 'ghost' : 'primary'}
          onClick={() => onToggleWatchlist(movie)}
        >
          {isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        </Button>
      </div>
    </article>
  )
}

export const MovieCard = memo(MovieCardComponent)
