import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    //All of these will be the permission flags
    let isManager = false
    let isAdmin = false
    let status = "Employee"
    
    //if we do have a token, we will start to check for permissions of the user
    if (token) {
        const decoded = jwtDecode(token)
        //destructure the values of the user
        const { username, roles } = decoded.UserInfo
        //check if the user has the role of manager or admin
        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        //set the highest role, the first one is the Manager, and above it is the Admin
        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        //return these filters, with them we will give permissions to the user
        return { username, roles, status, isManager, isAdmin }
    }

    //if we dont have a token this will be returned
    return { username: '', roles: [], isManager, isAdmin, status }
}

export default useAuth
