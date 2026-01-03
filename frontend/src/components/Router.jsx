
import { createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import ProtectedRoute from "./ProtectedRoute.jsx";
import Explore from "./Explore.jsx"
import Post from "./Post.jsx"
import Help from "./Help.jsx"
import Chat from "./Chat.jsx"
import Profile from './Profile.jsx'


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
        {/* Dev-only: direct access to homepage UI without auth */}
        <Route path="/dev-home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />}></Route>

        <Route element={<Home/>}>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/post" element={<Post/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/chat" element={<Chat/>}/>
             <Route path="/profile" element={<Profile/>}/>
        </Route>
        </>
    )
);


export default router

