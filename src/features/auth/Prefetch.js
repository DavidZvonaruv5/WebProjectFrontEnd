import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// This component is used to ensure that the subscription to the query does not expire after the default time of 60 seconds.
// We encountered issues with the subscription, so we found this solution online.
const Prefetch = () => {
    useEffect(() => {
        // Initiating the subscription for fetching notes and users
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        // Cleaning up the subscription when the component is unmounted
        //This is to ensure that the query cleans up when we go to unprotected pages
        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, []) // Empty dependency array to ensure this effect only runs once on component mount

    return <Outlet />
}
export default Prefetch