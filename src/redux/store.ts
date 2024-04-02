import { configureStore } from '@reduxjs/toolkit'
import imageSlice from './post.slice'
import { useDispatch } from 'react-redux'
import userSlice from './user.slice'

export const store = configureStore({
  reducer: {
    image: imageSlice,
    user: userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()