
import {RouterProvider } from "react-router-dom"
import router from "./components/router"
import { Authprovider } from "./auth/auth"

function App() {
  return (
    <Authprovider>
 <RouterProvider router={router}/>
 </Authprovider>
  )
}

export default App