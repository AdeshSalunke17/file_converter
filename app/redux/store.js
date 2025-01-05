import { configureStore } from '@reduxjs/toolkit'
import fileSliceReducer from '../features/fileSlice'
import selectedOptionReducer  from '../features/optionSlice'
import loaderReducer from '../features/loaderSlice'
import translationReducer from '../features/translationSlice'
export const store = configureStore({
  reducer: {
    file : fileSliceReducer,
    selectedOption : selectedOptionReducer,
    loader : loaderReducer,
    translation : translationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
})