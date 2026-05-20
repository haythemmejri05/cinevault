import { configureStore } from '@reduxjs/toolkit'
import ratingsReducer from './ratingsSlice'
import watchlistReducer from './watchlistSlice'

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    ratings: ratingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
