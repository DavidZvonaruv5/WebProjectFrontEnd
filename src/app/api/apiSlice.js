import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    //I could user exios, but I learned from the docs and found that good also so I decided to move along with this

    //the baseQuery will use fetchBaseQuery with the url provided, in development, we would want the base url to be the development port we are using such as: http://localhost:3500 but in production we need to change it to the domain we are getting.
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    //tagTypes will be used for cached data
    tagTypes: ['note', 'User'],
    //extended slices will be extended to this slice.
    endpoints: builder => ({})
})