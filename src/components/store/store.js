import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from '../slicess/counterSlice'
import  messageSlice  from '../massageSlice/MassageSlice'

export const store = configureStore({
  reducer: {
    userInfo : userSlice,
    massage : messageSlice
  },
})