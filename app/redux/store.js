import { configureStore } from '@reduxjs/toolkit'
import fileSliceReducer from './fileSlice'
import selectedOptionReducer  from '../features/optionSlice'
export const store = configureStore({
  reducer: {
    file : fileSliceReducer,
    selectedOption : selectedOptionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
})