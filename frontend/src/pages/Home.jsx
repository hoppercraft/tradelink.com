import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidepanel from "../components/Sidepanel";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-16">
        <Sidepanel />
        <main className="flex-1 ml-64 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
