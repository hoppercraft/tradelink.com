
import {RouterProvider } from "react-router-dom"
import router from "./components/Router"
import { Authprovider } from "./auth/auth"
import { DetailProvider } from "./context-products/detail_product"

function App() {
  return (
    <Authprovider>
      <DetailProvider>
        <RouterProvider router={router}/>
      </DetailProvider>
    </Authprovider>
  )
}

export default App