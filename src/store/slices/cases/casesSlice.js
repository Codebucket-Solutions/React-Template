import { createSlice } from "@reduxjs/toolkit";
import { fetchCases, updateCaseStatus } from "./casesThunk";

const initialState = {
    cases: [],
    pagination: null,
    isLoading: false,
};

export const casesSlice = createSlice({
    name: "cases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.cases = action.payload.cases;
                state.pagination = action.payload.pagination;
                state.isLoading = false;
            })
            .addCase(fetchCases.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCaseStatus.fulfilled, (state, action) => {
                const updated = action.payload;
                state.cases = state.cases.map((c) =>
                    c._id === updated._id ? updated : c
                );
            });
    },
});

export default casesSlice.reducer;
