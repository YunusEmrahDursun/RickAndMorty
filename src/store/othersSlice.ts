import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  registerUsers:any[]
}

const initialState: IState = {
  registerUsers:[]
}

export const others = createSlice({
  name: 'other',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      state.registerUsers = state.registerUsers.concat(action.payload);
    }
  }
})

export const { addUser } = others.actions

export default others.reducer