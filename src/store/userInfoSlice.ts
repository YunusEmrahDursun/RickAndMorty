import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
  userName: string,
  favorites:any[],
  jwt:string
}

const initialState: IState = {
  userName:"",
  favorites:[],
  jwt:""
  
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
    },
    loginUser: (state, action: PayloadAction<any>) => {
      state.userName = action.payload.userName;
      state.jwt = action.payload.jwt;
    },
    exit: (state) => {
      state.userName = "";
      state.jwt = "";
    },
  }
})

export const { addFavorite, deleteFavorite, loginUser, exit } = userInfo.actions

export default userInfo.reducer