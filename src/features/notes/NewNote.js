import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { PulseLoader } from 'react-spinners/PulseLoader'

//this component is used to create a new note
const NewNote = () => {
    
    //get the users from the query
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} /> //if there are no users in the store, display this message

    //NewNoteForm component will be displayed on the screen, where a new note can be created.
    const content = <NewNoteForm users={users} />

    //the content will be returned and displayed from here.
    return content
}
export default NewNote