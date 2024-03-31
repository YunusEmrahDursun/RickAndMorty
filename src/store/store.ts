import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfoSlice'
import othesrSlice from './othersSlice'

export const store = configureStore({
  reducer: {
    user: userInfoSlice,
    other: othesrSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch