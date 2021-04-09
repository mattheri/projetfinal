import { useRecoilValue } from "recoil";
import { appState } from "../../state/app";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../components/Navbar/Navigation";
import { usePrivateRoute } from "hooks/usePrivateRoute";

export const Admin = () => {
  const App = useRecoilValue(appState);
  usePrivateRoute();

  return (
    <>
      <Navigation />
      {App.connected && <Outlet />}
    </>
  );
};
