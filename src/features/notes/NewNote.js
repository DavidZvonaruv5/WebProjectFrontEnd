import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

//this component is used to create a new note
const NewNote = () => {
    const users = useSelector(selectAllUsers) //get all users from the store

    if (!users?.length) return <p>No users found</p> //if there are no users in the store, display this message

    //NewNoteForm component will be displayed on the screen, where a new note can be created.
   const content = <NewNoteForm users={users} />

    //the content will be returned and displayed from here.
    return content
}
export default NewNote