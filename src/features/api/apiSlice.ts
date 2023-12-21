import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  // baseURL: import.meta.env.API_BASE_URL,
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3007" }), 
  tagTypes: ['searchData'],
  endpoints: (builder) => ({
    getSearchedData: builder.query({
      query: () => '/searchData',
      providesTags: ['searchData'],
    }),
  }),
});

export const { useGetSearchedDataQuery } = apiSlice;


// baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.API_BASE_URL }), 
// baseUrl: "http://localhost:3007"