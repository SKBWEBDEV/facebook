import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("okey") ? JSON.parse (localStorage.getItem("okey")) : null
}

export const messageSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    massage: (state,actions) => {
      console.log(state.value);
      console.log(actions.payload);
      state.value = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { massage } = messageSlice.actions

export default messageSlice.reducer