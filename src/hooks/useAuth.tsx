import { useRecoilState } from "recoil";
import { User } from "../react-app-env";
import { appState } from "../state/app";

export const useAuth = () => {
  const [, setCurrentAppState] = useRecoilState(appState);
  const LS = window.localStorage;
  const currentUser = (() => {
    const user = LS.getItem("user");

    if (user) {
      return JSON.parse(user) as User;
    }

    return null;
  })();
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
