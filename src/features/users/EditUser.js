import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import { PulseLoader } from 'react-spinners/PulseLoader'

//here we dont actually need to make a query, we just need to use the selectUserById from the state of the selector hook!
const EditUser = () => {
    const { id } = useParams() //pull the id

    //get the user from the state
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id] //get the user
        }),
    })

    // if the user is found we can show the EditForm component, else we will tell it is still loading
    if (!user) return <PulseLoader color={"#FFF"} />
    const content = <EditUserForm user={user} />
    return content
}
export default EditUser