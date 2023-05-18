import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

//here we dont actually need to make a query, we just need to use the selectUserById from the state of the selector hook!
const EditUser = () => {
    const { id } = useParams() //pull the id 

    const user = useSelector(state => selectUserById(state, id)) //pass the id to the selector hook

    // if the user is found we can show the EditForm component, else we will tell it is still loading
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content
}
export default EditUser