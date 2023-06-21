import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    //in development use localhost, in development we need to change that
    baseUrl: 'https://TaskFlow-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Perform a standard query with the baseQuery function
    let result = await baseQuery(args, api, extraOptions)

    // If the result is an error, we assume it has a `status` field and check that it is a 403
    if (result?.error?.status === 403) {
        console.log('refresh token...')

        // Try to refresh the token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {

            //store a new token
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // Try the request again with the new token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    //I could use exios, but I learned from the docs and found that good also so I decided to move along with this
    //the baseQuery will use fetchBaseQuery with the url provided, in development, we would want the base url to be the development port we are using such as: http://localhost:3500 but in production we need to change it to the domain we are getting.
    baseQuery: baseQueryWithReauth,
    //tagTypes will be used for cached data
    tagTypes: ['Note', 'User'],
    //extended slices will be extended to this slice.
    endpoints: builder => ({})
})