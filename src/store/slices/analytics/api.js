import { axios } from "../../../shared/axios";
import { GET_ANALYTICS } from "../../../apiCall/urls/analytics";

export const getAnalyticsApi = async () => {
    try {
        const res = await axios.get(GET_ANALYTICS);
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Failed to fetch analytics" };
    }
};
