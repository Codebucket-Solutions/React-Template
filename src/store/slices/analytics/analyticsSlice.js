import { createSlice } from "@reduxjs/toolkit";
import { fetchAnalytics } from "./analyticsThunk";

const initialState = {
    data: null,
    isLoading: false,
};

export const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalytics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAnalytics.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAnalytics.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default analyticsSlice.reducer;
