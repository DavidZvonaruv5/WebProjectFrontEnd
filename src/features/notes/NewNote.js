import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

//this component is used to create a new note
const NewNote = () => {
    const users = useSelector(selectAllUsers) //get all users from the store

    //check if there are users that got pulled from the store, if not display Loading on the page, after the users are pulled, the users const will be true, and NewNoteForm component will be displayed on the screen, where a new note can be created.
    const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>

    //the content will be returned and displayed from here.
    return content
}
export default NewNote