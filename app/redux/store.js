import { configureStore } from '@reduxjs/toolkit'
import fileSliceReducer from '../features/fileSlice'
import selectedOptionReducer  from '../features/optionSlice'
import loaderReducer from '../features/loaderSlice'
export const store = configureStore({
  reducer: {
    file : fileSliceReducer,
    selectedOption : selectedOptionReducer,
    loader : loaderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
})