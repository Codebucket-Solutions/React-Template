import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi, loginApi } from "./api";
import { actionNotifier } from "../../../components/ui/toast";
import { apiLoading, apiLoadingEnd } from "../notifications/notificationSlice";

export const signup = createAsyncThunk(
    "auth/signup",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            dispatch(apiLoading());
            const response = await signupApi(data);
            if (response?.success) {
                actionNotifier.success(response?.message || "Signup successful");
                return { ...response.data, token: response.token };
            } else {
                actionNotifier.error(response?.message || "Signup failed");
                return rejectWithValue(response?.message || "Signup failed");
            }
        } catch (error) {
            actionNotifier.error(error?.message || "Something went wrong");
            return rejectWithValue(error?.message);
        } finally {
            dispatch(apiLoadingEnd());
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            dispatch(apiLoading());
            const response = await loginApi(data);
            if (response?.success) {
                localStorage.setItem("vibeGuard-auth", JSON.stringify({ ...response.data, token: response.token }));
                actionNotifier.success(response?.message || "Login successful");
                return { ...response.data, token: response.token };
            } else {
                actionNotifier.error(response?.message || "Invalid credentials");
                return rejectWithValue(response?.message || "Invalid credentials");
            }
        } catch (error) {
            actionNotifier.error(error?.message || "Something went wrong");
            return rejectWithValue(error?.message);
        } finally {
            dispatch(apiLoadingEnd());
        }
    }
);
