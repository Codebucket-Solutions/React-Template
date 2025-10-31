import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSampleData } from './api';

const initialState = {
    value: 0,
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            // Await the API response
            const response = await getSampleData();
            return response.data; // This becomes action.payload
        } catch (error) {
            // Return a handled error message
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
