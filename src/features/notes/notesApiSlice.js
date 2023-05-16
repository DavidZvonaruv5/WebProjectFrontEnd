import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'


//this is for working with normalized data
const notesAdapter = createEntityAdapter({
    sortComparer: (a,b) => (a.completed === b.completed) ? 0: a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            //queries to the endpoint
            query: () => '/notes',
            //checks if the response is valid
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, //this timer is now set to 5 seconds and its purpose to delete any unused data, 5 seconds in abit low, in production it should be atleast one minute
            transformResponse: responseData => {
                //transforms the raw response to normalized and usable data
                const loadedNotes = responseData.map(note => {
                    note.id = note._id //normalize the data
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes) //store the normalize data
            },
            providesTags: (result, error, arg) => {
                //This I actually got from the documentation, it helps  manage caching and invalidation of data.
                //this is not a must, but I found that helpful in this project
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
    }),
})

export const { //generates a custom hook and executes the getNotes query
    useGetNotesQuery,
} = notesApiSlice

// returns the query result object back after calling getNotes query.
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    //this is from the reselect library, straight from the documentation.
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids and entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    //these selectors will work based on the normalized data provided from the 'selectNotesData' selector
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)
//state => selectNotesData(state) ?? initialState checks if the state is undefined, if it is, it will return the initialState, if not, it will return the state


//in general, this could be done via the information I've gathered in lecture 8-preact & tailwind, but in ex8 we used reducers and dispatch, I found that interesting, I found a redux video on youtube and explored.

//Disclaimer, all of the documentation of this code I wrote with word-wrap(alt+z or go to view-> word Wrap).