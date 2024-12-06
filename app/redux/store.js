import { configureStore } from '@reduxjs/toolkit'
import fileSliceReducer from './fileSlice'
export const store = configureStore({
  reducer: {
    file : fileSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
})