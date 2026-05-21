import { useMemo, useRef } from 'react'
import { MovieGrid, SearchInput, type SearchInputHandle } from '@/components/movie'
import { ErrorFallback } from '@/components/shared'
import { withErrorBoundary } from '@/hoc'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { add, remove } from '@/store/watchlistSlice'
import { setRating } from '@/store/ratingsSlice'
import type { Movie } from '@/types'

const MovieGridWithErrorBoundary = withErrorBoundary(MovieGrid, ErrorFallback)

export function HomePage() {
  const dispatch = useAppDispatch()
  const searchInputRef = useRef<SearchInputHandle>(null)

  const watchlist = useAppSelector((state) => state.watchlist)
  const ratings = useAppSelector((state) => state.ratings)

  const movies: Movie[] = []

  const watchlistIds = useMemo(() => watchlist.map((item) => item.movieId), [watchlist])

  function handleSearch(query: string) {
    console.log('Search query:', query)
  }

  function handleClearSearch() {
    console.log('Search cleared')
  }

  function handleCardClick(movie: Movie) {
    console.log('Selected movie:', movie)
  }

  function handleToggleWatchlist(movie: Movie) {
    const exists = watchlistIds.includes(movie.id)

    if (exists) {
      dispatch(remove(movie.id))
    } else {
      dispatch(
        add({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.posterPath,
          addedAt: new Date().toISOString(),
        }),
      )
    }
  }

  function handleRate(movieId: number, score: number) {
    dispatch(setRating({ movieId, rating: score }))
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <SearchInput ref={searchInputRef} onSearch={handleSearch} onClear={handleClearSearch} />

      <MovieGridWithErrorBoundary
        movies={movies}
        watchlistIds={watchlistIds}
        ratings={ratings}
        onCardClick={handleCardClick}
        onToggleWatchlist={handleToggleWatchlist}
        onRate={handleRate}
      />
    </main>
  )
}
