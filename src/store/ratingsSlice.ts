import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type RatingsState = Record<number, number>

type SetRatingPayload = {
  movieId: number
  rating: number
}

const initialState: RatingsState = {}

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<SetRatingPayload>) => {
      state[action.payload.movieId] = action.payload.rating
    },
  },
})

export const { setRating } = ratingsSlice.actions

export default ratingsSlice.reducer
