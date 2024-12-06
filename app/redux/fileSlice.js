import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filesArray : []
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.filesArray.push(action.payload);  
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFile } = fileSlice.actions

export default fileSlice.reducer