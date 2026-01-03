import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserListApi } from "./apis";
import { actionNotifier } from "../../components/ui/toast";
import { apiLoading, apiLoadingEnd } from "../../store/slices/notifications/notificationSlice";

export const getUserList = createAsyncThunk(
    'user/getUserList',
    async ({ data, callback }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(apiLoading())
            const response = await getUserListApi(data);
            if (response?.status) {
                if(callback){
                    callback()
                }
                actionNotifier.success("Profile updated successfully")
                return response?.data;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        } finally {
            dispatch(apiLoadingEnd())
        }
    }
)
