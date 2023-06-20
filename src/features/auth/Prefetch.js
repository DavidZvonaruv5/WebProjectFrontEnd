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
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, []) // Empty dependency array to ensure this effect only runs once on component mount

    return <Outlet />
}
export default Prefetch