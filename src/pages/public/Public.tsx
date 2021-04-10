import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

export const Public = () => {
  const location = useLocation();

  return (
    <>
      <Header full={location.pathname === "/"} />
      <Outlet />
      <Footer />
    </>
  );
};
