import { useParams } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import EditNoteForm from './EditNoteForm'
import { useGetNotesQuery } from './notesApiSlice'
import useAuth from '../../hooks/useAuth'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

//this component is used to edit a note, 
const EditNote = () => {
    useTitle('Edit Note')
    
    const { id } = useParams() //getting the id from the url parameter.

    const { username, isManager, isAdmin } = useAuth()

    //how we define the note
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    //get the users by the id
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    //check if the note does not exist or the users array is empty
    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />

    //check if the user is not a manager and not an admin
    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    //display the edit note form if all of the tests pass
    const content = <EditNoteForm note={note} users={users} />

    return content
}
export default EditNote