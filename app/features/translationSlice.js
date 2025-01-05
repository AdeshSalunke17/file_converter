import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    t : {}
}

export const translationSlice = createSlice({
    name : "translation",
    initialState,
    reducers : {
        setTranslation : (state , action) => {
            state.t = {...action.payload};
        }
    }
});

export const {setTranslation} = translationSlice.actions;
export default translationSlice.reducer;