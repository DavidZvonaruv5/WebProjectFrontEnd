import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'


//in this component, we are passingthe userId as a prop
const User = ({ userId }) => {
    //using the userId that we passed down a a prop to get the user
    const user = useSelector(state => selectUserById(state, userId))

    //using useNavigate to route easier
    const navigate = useNavigate()

    //if the use exists, navigate to the user with its id route
    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        //make the all of the user roles comma seperated so that it will be easier to see
        const userRolesString = user.roles.toString().replaceAll(',', ', ')
        //check if the is active, if not, show inactive status
        const cellStatus = user.active ? '' : 'table__cell--inactive'

        //return a row in the users table that will include a cell for the user's username, his role, and a button  to edit a user
        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User