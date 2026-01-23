import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SidePanel from "../components/Sidepanel";
import { DetailProvider } from "../context-products/detail_product";

function Home() {
  return (
    <>
      <Header />
      <SidePanel />
      <main className="ml-64 pt-18 p-4">
        <DetailProvider>
          <Outlet />
        </DetailProvider>
      </main>
    </>
  );
}

export default Home;
