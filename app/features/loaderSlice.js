import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loadingState : false
}
export const loaderSlice = createSlice({
    name : 'loader',
    initialState,
    reducers: {
        setLoader : (state, action) => {
            state.loadingState = action.payload;
        }
    }
})

export const {setLoader} = loaderSlice.actions;
export default loaderSlice.reducer;