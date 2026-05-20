import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { WatchlistItem } from '@/types'

const WATCHLIST_STORAGE_KEY = 'cinevault_watchlist'

function loadWatchlist(): WatchlistItem[] {
  try {
    const storedWatchlist = localStorage.getItem(WATCHLIST_STORAGE_KEY)

    if (!storedWatchlist) {
      return []
    }

    return JSON.parse(storedWatchlist) as WatchlistItem[]
  } catch {
    return []
  }
}

function saveWatchlist(watchlist: WatchlistItem[]) {
  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist))
}

const initialState: WatchlistItem[] = loadWatchlist()

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<WatchlistItem>) => {
      const exists = state.some((item) => item.movieId === action.payload.movieId)

      if (!exists) {
        state.push(action.payload)
        saveWatchlist(state)
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      const updatedWatchlist = state.filter((item) => item.movieId !== action.payload)

      saveWatchlist(updatedWatchlist)

      return updatedWatchlist
    },
  },
})

export const { add, remove } = watchlistSlice.actions

export default watchlistSlice.reducer
