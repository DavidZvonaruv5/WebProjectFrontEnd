import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    //we are using the useAuth hook to get the username and status of the user
    const {username, isManager, isAdmin} = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    //In this component we are showing the welcome page, in this page the user will have the options to route to different functionalities in the app, among them the user can view notes, add a new note, view user Settings.
    //with each section in the page, we check if the user has the permission to press on the button
    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/notes">View Notes</Link></p>

            <p><Link to="/dash/notes/new">Add New Note</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome