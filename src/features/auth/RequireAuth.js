import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import React from 'react'

const RequireAuth = ({allowedRoles}) => {
    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        //if this is true atleast once, return true
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}

export default RequireAuth

/*
  The RequireAuth component is a route guard that restricts access to certain routes based on user roles in the TaskFlow application.
  It checks if the user's roles include any of the allowed roles specified in the component's props. If the user has the required role(s), it renders the nested routes (Outlet). Otherwise, it redirects the user to the login page.

  The component consists of the following main elements:

  - useLocation: The useLocation hook is used to get information about the current location (URL) in the React Router DOM.
  - useAuth: The useAuth hook is used to get the user's roles from the authentication context.

  - Conditional Rendering: The component conditionally renders different content based on the user's roles and the allowed roles specified in the props:
    - If any of the user's roles match any of the allowed roles, the nested routes (Outlet) are rendered.
    - If the user does not have any of the allowed roles, they are redirected to the login page with the current location (URL) stored in the state object for future redirection after successful login.
*/

