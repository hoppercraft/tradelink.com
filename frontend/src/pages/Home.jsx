import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SidePanel from "../components/Sidepanel";

function Home() {
  return (
    <>
      <Header />
      <SidePanel />
      <main className="ml-64 pt-18 p-4">
        <Outlet />
      </main>
    </>
  );
}

export default Home;
