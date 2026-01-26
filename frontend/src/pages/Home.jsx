import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SidePanel from "../components/Sidepanel";
import { DetailProvider } from "../context-products/detail_product";

function Home() {
  return (
    <>
     <DetailProvider>
      <Header />
      <SidePanel />
      <main className="ml-64 pt-18 p-4">
          <Outlet />
      </main>
      </DetailProvider>
    </>
  );
}

export default Home;
