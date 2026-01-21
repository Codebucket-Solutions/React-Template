import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "./userThunk";
const initialState = {
        data: [],
        totalCount: 0,
        loading: false,
        error: null,
};

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        clearUserList : (state) => {
            state.userList = {
                data: [],
                totalCount: 0,
                loading: false,
                error: null,
            };
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getUserList.fulfilled, (state, action) => {
            state.userList = action.payload;
        })
    }
})

export const { clearUserList } = userSlice.actions;
export default userSlice.reducer;
