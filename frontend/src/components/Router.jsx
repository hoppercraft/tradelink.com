import { createBrowserRouter, createRoutesFromElements, Route,Navigate } from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Explore from "./Explore.jsx";
import Post from "./Post.jsx";
import Help from "./Help.jsx";
import Chat from "./Chat.jsx";
import Profile from './Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home/explore" replace />} />
      {/* Protected /home route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route path="explore" element={<Explore />} />
        <Route path="post" element={<Post />} />
        <Route path="help" element={<Help />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Dev-home (no auth) */}
      <Route path="/dev-home" element={<Home />}>
        <Route path="explore" element={<Explore />} />
        <Route path="post" element={<Post />} />
        <Route path="help" element={<Help />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
