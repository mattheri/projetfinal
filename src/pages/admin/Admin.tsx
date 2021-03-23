import React from "react";
import { useRecoilValue } from "recoil";
import { appState } from "../../state/app";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigation } from "../../components/Navbar/Navigation";

export const Admin = () => {
  const App = useRecoilValue(appState);
  const navigate = useNavigate();

  if (App.user?.role !== "admin") {
    navigate("/");
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
