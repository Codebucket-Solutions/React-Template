import { axios } from "../../../shared/axios";
import { GET_CASES, UPDATE_CASE_STATUS } from "../../../apiCall/urls/cases";

export const getCasesApi = async (params = {}) => {
    try {
        const res = await axios.get(GET_CASES, { params });
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Failed to fetch cases" };
    }
};

export const updateCaseStatusApi = async (id, status) => {
    try {
        const res = await axios.patch(UPDATE_CASE_STATUS(id), { status });
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Failed to update case" };
    }
};
