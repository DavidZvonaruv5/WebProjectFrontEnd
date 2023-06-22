import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Adding the apiSlice reducer to the store with a key matching the reducerPath
        auth: authReducer, // Adding the authReducer to the store with a key "auth"
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware), // Adding the apiSlice middleware to the store's middleware
    devTools: false // Disabling Redux DevTools
})

setupListeners(store.dispatch) //allows dynamic changes on different screens
// Setting up listeners for automatic API request handling when dispatching actions
