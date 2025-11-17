import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo: (state,actions) => {
      console.log(state.value);
      console.log(actions.payload);
      state.value = actions.payload
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { userInfo } = userSlice.actions

export default userSlice.reducer