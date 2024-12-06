import { createSlice } from '@reduxjs/toolkit'
import moduleData from '../utility/data.json'
const initialState = {
    selectedOption : '',
    module : null
}

export const selectedOptionSlice = createSlice({
    name: 'selectedOption',
    initialState,
    reducers: {
      setSelectedOption: (state, action) => {
        state.selectedOption = action.payload;
        state.module = moduleData.filter(module => module.moduleName === action.payload)[0];
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSelectedOption } = selectedOptionSlice.actions
  
  export default selectedOptionSlice.reducer