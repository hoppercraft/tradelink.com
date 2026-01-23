import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Explore from "./components/Explore";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Help from "./components/Help";
import Chat from "./components/Chat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Home Routes */}
      <Route path="/home" element={<Home />}>
        <Route index element={<Navigate to="/home/explore" replace />} />
        <Route path="explore" element={<Explore />} />
        <Route path="post" element={<Post />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="help" element={<Help />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
