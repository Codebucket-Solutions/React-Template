import { apiFunction } from "../../apiCall/function";
import { GET_USER_LIST } from "../../apiCall/urls/auth";

export const getUserListApi = (data) => {
    return apiFunction(GET_USER_LIST, 'POST', data, true, null, "Auth", null, null);
};