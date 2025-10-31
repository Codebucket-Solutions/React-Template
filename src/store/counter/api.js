import { apiFunction } from "../../apiCall/function";
import { GET_SAMPLE_DATA } from "../../apiCall/urls/auth";

const getSampleData = () => {
    return apiFunction(GET_SAMPLE_DATA, 'POST', null, false, null, null, null, null);
};

export { getSampleData };