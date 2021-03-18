import { Header } from "../../components/Header/Header";
import { useLocation, Routes, Route, Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Sidebar } from "../../components/ui/sidebar/Sidebar";

export const Public = () => {
  const location = useLocation();

  return (
    <>
      <Header full={location.pathname === "/"} />
      <div className="d-flex">
        <Outlet />
        {location.pathname.includes("stage") && <Sidebar />}
        {location.pathname.includes("stagiaire") && <Sidebar />}
      </div>
      <Footer />
    </>
  );
};
