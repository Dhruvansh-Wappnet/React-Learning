import Dashboard from './components/dashboard.jsx'
import Logout from './components/Logout.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter(
    [
      {
        path: '/',
        element:
        <div>
          <SignUp />
        </div>
      },
      {
        path: '/login',
        element:
        <div>
          <SignIn />
        </div>
      },
      {
        path: '/dashboard',
        element:
        <div>
          <Dashboard />
        </div>
      },
      {
        path: '/logout',
        element:
        <div>
          <Logout />
        </div>
      },
      {
        path: '*',
        element:
        <div>
          <h1>404 Page Not Found</h1>
        </div>
      },
    ]
  )
  
  function App() {
  
    return (
      <>
        <RouterProvider router={router} />
      </>
    )
  }
  
  export default App
