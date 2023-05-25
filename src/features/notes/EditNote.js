import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'

//this component is used to edit a note, 
const EditNote = () => {
    //
    const { id } = useParams() //getting the id from the url parameter.
    const note = useSelector(state => selectNoteById(state, id)) //using the store, pulling the note with its state, by filtering the ids.
    const users = useSelector(selectAllUsers) //pulling the users from the store(redux store)

    //check if the note and users are present, if not, state that is it still loading, if both are true, then display the EditNoteForm component where we display the edit note page.
    const content = note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>

    //the content will be returned and displayed from here.
    return content
}
export default EditNote