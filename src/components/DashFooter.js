import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const DashFooter = () => {
    
    const {username, status} = useAuth() // Using the useAuth hook to get the username and status of the current user

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    const goLiveChatClicked = () => navigate('/dash/chat')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }


    let liveChat = (
        <button className="dash-footer__button icon-button" onClick={goLiveChatClicked}>
            Live chat
        </button>
    )
    
    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User: {username}</p>
            <p>Status:{status}</p>
             {liveChat}
        </footer>
    )
    return content
}
export default DashFooter

/*
  The DashFooter component is responsible for rendering the footer section of a dashboard.
  It displays the Home button, current user information, status, and the Live Chat button.

  The component utilizes various libraries and hooks to implement the desired functionality:
  
  - `@fortawesome/react-fontawesome` and `@fortawesome/free-solid-svg-icons` are used to render the FontAwesome icons.
  - The `react-router-dom` library is used to handle navigation within the dashboard.
  - The `useAuth` custom hook is used to fetch and manage authentication-related information.

  The component consists of the following main elements:
  
  - `useAuth`: The useAuth hook is used to retrieve the current user's username and status.
  - `useNavigate` and `useLocation`: These hooks are used for programmatic navigation and accessing the current pathname.
  - `onGoHomeClicked`: This function is triggered when the Home button is clicked, and it navigates to the '/dash' route.
  - `goLiveChatClicked`: This function is triggered when the Live Chat button is clicked, and it navigates to the '/dash/chat' route.
  - `goHomeButton`: This button element is conditionally rendered based on the current pathname. It triggers the navigation to the '/dash' route.
  - `liveChat`: This button element represents the Live Chat button and triggers navigation to the '/dash/chat' route.
  - `content`: The JSX content of the footer, consisting of the buttons, user information, status, and the Live Chat button.

  The DashFooter component exports the default export, making it available for use in other components.
*/
