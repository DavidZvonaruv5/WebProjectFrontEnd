import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout

/*
  The DashLayout component serves as the layout for the dashboard pages.
  It includes the DashHeader, content area, and DashFooter components.

  The component consists of the following main elements:

  - `DashHeader`: The DashHeader component renders the header section of the dashboard, including the logo and navigation buttons.
  - Content Area: The `<Outlet />` component from `react-router-dom` is used to render the content of the current route within the dashboard.
  - `DashFooter`: The DashFooter component renders the footer section of the dashboard, displaying user information and additional functionalities.

  The DashLayout component is intended to be used as a parent component for all dashboard-related pages.
  It provides a consistent layout structure and includes the necessary header and footer components.
*/