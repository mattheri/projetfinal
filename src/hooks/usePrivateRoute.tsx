import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const usePrivateRoute = (to: string = "/connexion") => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate(to);
  }
};
