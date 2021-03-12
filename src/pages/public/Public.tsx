import React from "react";
import { Header } from "../../components/Header/Header";
import { useLocation, Routes, Route, Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Stages } from "./stages/Stages";

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
