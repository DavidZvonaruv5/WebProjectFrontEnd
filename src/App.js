import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';
import LiveChat from './features/chat/Livechat'


//starting with the permenent layout, and adding routes to the page
function App() {
  useTitle('TaskFlow')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Open Routes*/}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch/>}>
            {/* Start Dash */}
            <Route path="dash" element={<DashLayout />}>

              <Route index element={<Welcome />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>
              </Route>

              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>
              <Route path="chat">
                <Route index element={<LiveChat />} />    
              </Route>
              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Of Protected Routes */}

      </Route>
    </Routes>
  );
}

export default App;

/*
  The App component represents the root component of the TaskFlow application.

  The component consists of the following main elements:

  - useTitle: The useTitle hook is used to dynamically set the document title to "TaskFlow".

  - Routes: The Routes component from react-router-dom is used to define the routing configuration of the application.

  - Route: The Route components define individual routes and their corresponding elements.
    - The outermost Route component wraps the entire application and sets the Layout component as its element.

    - Open Routes: These routes are accessible to all users.
      - The index route renders the Public component.
      - The "/login" route renders the Login component.

    - Protected Routes: These routes require authentication and are protected by the PersistLogin and RequireAuth components.
      - PersistLogin: This component handles the persistent login feature and ensures that the user's login state is preserved across browser sessions.
      - RequireAuth: This component checks if the user is authenticated and has the required roles to access the routes.
        - Prefetch: This component prefetches data before rendering the protected routes.

      - DashLayout: This component represents the layout for the authenticated dashboard.
        - Welcome: The index route of the DashLayout renders the Welcome component.
        - Users Routes: These routes are accessible to managers and admins.
          - UsersList: The index route renders the UsersList component.
          - EditUser: The ":id" route renders the EditUser component.
          - NewUserForm: The "new" route renders the NewUserForm component.

        - Notes Routes: These routes are accessible to all authenticated users.
          - NotesList: The index route renders the NotesList component.
          - EditNote: The ":id" route renders the EditNote component.
          - NewNote: The "new" route renders the NewNote component.
        
        - LiveChat Route: This route represents the live chat feature and renders the LiveChat component.

  Overall, the App component defines the routing configuration for the TaskFlow application, rendering the appropriate components based on the requested routes. It includes both open and protected routes, with authentication and role-based access control implemented using the PersistLogin and RequireAuth components.
*/
