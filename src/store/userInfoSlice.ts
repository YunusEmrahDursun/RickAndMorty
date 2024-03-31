import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface CounterState {
  userName: string,
  favorites:any[]
}

const initialState: CounterState = {
  userName:"",
  favorites:[]
  
}

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites = state.favorites.concat(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<number>) => {
      state.favorites.splice(action.payload,1)
      state.favorites = state.favorites;
    }
  }
})

export const { addFavorite, deleteFavorite } = userInfo.actions

export default userInfo.reducer