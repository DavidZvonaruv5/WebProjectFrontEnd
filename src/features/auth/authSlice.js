import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        //after we get the data from the api we are going to have data in out payload, we pipe down the data and set the token to the accessToken we are getting
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logout: (state, action) => {
            state.token = null //set the state of the token to null when logging out
        },

    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token