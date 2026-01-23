
import {RouterProvider } from "react-router-dom"
import router from "./components/Router"
import { Authprovider } from "./auth/auth"

function App() {
  return (
    <Authprovider>
 <RouterProvider router={router}/>
 </Authprovider>
  )
}

export default App