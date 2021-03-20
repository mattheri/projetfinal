import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useAdminRoute = (to: string = "/") => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser?.role !== "admin") {
    navigate(to);
  }
};
