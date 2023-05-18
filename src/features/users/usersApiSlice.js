import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'


//this is for working with normalized data
const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            //queries to the endpoint
            query: () => '/users',
            //checks if the response is valid
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, //this timer is now set to 5 seconds and its purpose to delete any unused data, 5 seconds in abit low, in production it should be atleast one minute
            transformResponse: responseData => {
                //transforms the raw response to normalized and usable data
                const loadedUsers = responseData.map(user => {
                    user.id = user._id //normalize the data
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers) //store the normalize data
            },
            providesTags: (result, error, arg) => {
                //This I actually got from the documentation, it helps  manage caching and invalidation of data.
                //this is not a must, but I found that helpful in this project
                //when using redux then this is a good way, of course outside redux that would be much harder to accomplish but it can be done
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        //this is a a builder mutation, we are mutati
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData, //we just need to spread the inital users
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }//we need to get to the specific user, hence we are also providing the arg.id
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }//same as update
            ]
        }),
    }),
})

export const { //generates a custom hook and executes the getUsers query
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateNewUserMutation,
    useDeleteNewUserMutation,
} = usersApiSlice

// returns the query result object back after calling getUsers query.
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    //this is from the reselect library, straight from the documentation.
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids and entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    //these selectors will work based on the normalized data provided from the 'selectUsersData' selector
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
//state => selectUsersData(state) ?? initialState checks if the state is undefined, if it is, it will return the initialState, if not, it will return the state


//in general, this could be done via the information I've gathered in lecture 8-preact & tailwind, but in ex8 we used reducers and dispatch, I found that interesting, I found a redux video on youtube and explored.

//Disclaimer, all of the documentation of this code I wrote with word-wrap(alt+z or go to view-> word Wrap).