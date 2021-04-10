import { useAuth } from "hooks/useAuth";

export const useGetCurrentUserType = () => {
  const { currentUser } = useAuth();

  return currentUser?.type === "entreprise" ? "entreprise" : "etudiant";
};
