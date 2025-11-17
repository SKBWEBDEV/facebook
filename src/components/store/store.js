import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from '../slicess/counterSlice'

export const store = configureStore({
  reducer: {
    userInfo : userSlice
  },
})