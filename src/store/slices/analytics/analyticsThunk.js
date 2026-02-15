import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAnalyticsApi } from "./api";
import { actionNotifier } from "../../../components/ui/toast";
import { apiLoading, apiLoadingEnd } from "../notifications/notificationSlice";

export const fetchAnalytics = createAsyncThunk(
    "analytics/fetchAnalytics",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(apiLoading());
            const response = await getAnalyticsApi();
            if (response?.success) {
                return response.data;
            } else {
                actionNotifier.error(response?.message || "Failed to fetch analytics");
                return rejectWithValue(response?.message);
            }
        } catch (error) {
            actionNotifier.error(error?.message || "Something went wrong");
            return rejectWithValue(error?.message);
        } finally {
            dispatch(apiLoadingEnd());
        }
    }
);
