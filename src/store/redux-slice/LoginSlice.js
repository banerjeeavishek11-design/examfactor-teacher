import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
}

const loginAuthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginAction: (state,action) => {
           state.data = action.payload
        }
    },
});

export const { loginAction } = loginAuthSlice.actions;
export default loginAuthSlice.reducer;