import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "./authThunk";

const initialState = {
    auth: null,
    isAuthLoading: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.auth = null;
            localStorage.clear();
            window.location.reload();
        },
        setAuthLoaded: (state) => {
            state.isAuthLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.auth = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.auth = action.payload;
            });
    },
});

export const { logout, setAuthLoaded } = authSlice.actions;

export default authSlice.reducer;
