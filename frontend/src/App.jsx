
import {RouterProvider } from "react-router-dom"
import router from "./components/router"

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function App() {
  return (
 <RouterProvider router={router}/>
  )
}

export default App