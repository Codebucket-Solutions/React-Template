
import { baseApi } from "../../apiCall/rtkBaseApi/baseApi";

export const todoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSampleData: builder.query({
            query: () => ({
                url: '/sample-data', // Replace with your actual endpoint
                method: 'GET', // Use 'GET' for fetching data
            }),
            providesTags: ['todos'], // Tags to refetch data when mutation occurs
        }),
        addSampleData: builder.mutation({
            query: (newData) => ({
                url: '/sample-data', // Replace with your actual endpoint
                method: 'POST', // Use 'POST' for adding data
                body: newData, // The data to be sent in the request body
            }),
            invalidatesTags: ['todos'], // Invalidate 'todos' tag to refetch data after mutation
        }),

    }),
});

export const {
    useGetSampleDataQuery,
    useAddSampleDataMutation,
} = todoApi;