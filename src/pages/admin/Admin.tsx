import React from "react";
import { useRecoilValue } from "recoil";
import { appState } from "../../state/app";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const App = useRecoilValue(appState);
  const navigate = useNavigate();

  if (App.user?.role !== "admin") {
    navigate("/");
  }

  return (
    <>
      <h1>You are an admin</h1>
    </>
  );
};
