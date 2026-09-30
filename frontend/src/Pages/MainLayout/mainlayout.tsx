import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Navbar/navbar";
import Footer from "../../Components/Footer/Footer";

export const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
