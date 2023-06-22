import { faRightFromBracket, faFileCirclePlus, faFilePen, faUserGear, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from "../hooks/useAuth"

//we are going to verify  what location we are on or not on, and this way we can display buttons according to the current location
const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const {isManager, isAdmin} = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">TaskFlow</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader

/*
  The DashHeader component is responsible for rendering the header section of a dashboard.
  It displays the TaskFlow logo, navigation buttons, and handles user logout functionality.

  The component utilizes various libraries, hooks, and FontAwesome icons to implement the desired functionality:

  - `@fortawesome/react-fontawesome` and `@fortawesome/free-solid-svg-icons` are used to render the FontAwesome icons.
  - The `react-router-dom` library is used for routing and navigation within the dashboard.
  - The `useAuth` custom hook is used to fetch and manage authentication-related information.
  - The `useSendLogoutMutation` hook is used to send a logout mutation.

  The component consists of the following main elements:

  - `useAuth`: The useAuth hook is used to retrieve the isManager and isAdmin flags for user role verification.
  - `useNavigate` and `useLocation`: These hooks are used for programmatic navigation and accessing the current pathname.
  - `useSendLogoutMutation`: This hook is used to send a logout mutation and manage the logout process.
  - `onNewNoteClicked`: This function is triggered when the New Note button is clicked and navigates to '/dash/notes/new'.
  - `onNewUserClicked`: This function is triggered when the New User button is clicked and navigates to '/dash/users/new'.
  - `onNotesClicked`: This function is triggered when the Notes button is clicked and navigates to '/dash/notes'.
  - `onUsersClicked`: This function is triggered when the Users button is clicked and navigates to '/dash/users'.
  - Dynamic Button Rendering: The component conditionally renders buttons based on the current pathname and user roles.
  - `sendLogout`: This function triggers the logout process when the Logout button is clicked.
  - JSX Content: The JSX content of the header, consisting of the logo, navigation buttons, and error handling.

  The DashHeader component exports the default export, making it available for use in other components.
*/