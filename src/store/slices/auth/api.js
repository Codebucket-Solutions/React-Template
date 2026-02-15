import { axios } from "../../../shared/axios";
import { SIGNUP, LOGIN } from "../../../apiCall/urls/auth";

export const signupApi = async (data) => {
    try {
        const res = await axios.post(SIGNUP, data);
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Something went wrong" };
    }
};

export const loginApi = async (data) => {
    try {
        const res = await axios.post(LOGIN, data);
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Something went wrong" };
    }
};
