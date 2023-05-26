import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    //In this component we are showing the welcome page, in this page the user will have the options to route to different functionalities in the app, among them the user can view notes, add a new note, view user Settings.
    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/notes">View Notes</Link></p>

            <p><Link to="/dash/notes/new">Add New Note</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>

            <p><Link to="/dash/users/new">Add New User</Link></p>

        </section>
    )

    return content
}
export default Welcome