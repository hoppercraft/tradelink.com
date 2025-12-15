
import { createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import ProtectedRoute from "./ProtectedRoute.jsx";


const router=createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
              </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />}></Route>
        </>
    )
);


export default router

