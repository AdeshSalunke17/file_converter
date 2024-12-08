import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filesArray : []
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action) => {
      const mainObject = {
        fileObject : action.payload,
        toFormat : ''
      }
      state.filesArray.push(mainObject);  
    },
    setToFormat : (state, action) => {
      const {toFormat, fileIndex } = action.payload;
      if (state.filesArray[fileIndex]) {
        state.filesArray[fileIndex].toFormat = toFormat;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFile, setToFormat } = fileSlice.actions

export default fileSlice.reducer