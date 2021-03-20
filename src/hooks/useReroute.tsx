import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useRerouteOnFirstAccess = (to: string, elsewhere?: string) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser?.premiereConnexion) {
    navigate(to);
  }

  if (elsewhere && !currentUser?.premiereConnexion) {
    navigate(elsewhere);
  }
};
