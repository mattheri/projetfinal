import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { User } from "../react-app-env";
import { appState } from "../state/app";
import { IDB } from "../state/IDB";

export const useAuth = () => {
  const [currentAppState, setCurrentAppState] = useRecoilState(appState);
  const LS = window.localStorage;
  const currentUser = LS.getItem("user");
  const onSignIn = async (user: User) => {
    if (currentUser) {
      LS.removeItem("user");
    }
    LS.setItem("user", JSON.stringify(user));
    setCurrentAppState({
      connected: true,
      user: user,
    });
    return user;
  };
  const onSignOut = async () => {
    if (currentUser) {
      LS.removeItem("user");
    }
    setCurrentAppState({
      connected: false,
      user: null,
    });
  };

  return {
    currentUser,
    onSignIn,
    onSignOut,
  };
};
