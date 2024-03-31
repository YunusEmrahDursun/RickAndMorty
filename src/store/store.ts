import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfoSlice'

export const store = configureStore({
  reducer: {
    data: userInfoSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch