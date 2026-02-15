import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCasesApi, updateCaseStatusApi } from "./api";
import { actionNotifier } from "../../../components/ui/toast";
import { apiLoading, apiLoadingEnd } from "../notifications/notificationSlice";

export const fetchCases = createAsyncThunk(
    "cases/fetchCases",
    async (params = {}, { dispatch, rejectWithValue }) => {
        try {
            dispatch(apiLoading());
            const response = await getCasesApi(params);
            if (response?.success) {
                return response.data; // { cases, pagination }
            } else {
                actionNotifier.error(response?.message || "Failed to fetch cases");
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

export const updateCaseStatus = createAsyncThunk(
    "cases/updateCaseStatus",
    async ({ id, status }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(apiLoading());
            const response = await updateCaseStatusApi(id, status);
            if (response?.success) {
                actionNotifier.success(response?.message || "Status updated");
                return response.data; // updated case
            } else {
                actionNotifier.error(response?.message || "Failed to update status");
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
