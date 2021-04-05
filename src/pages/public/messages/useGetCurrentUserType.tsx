import { useAuth } from "hooks/useAuth";
import React from "react";

export const useGetCurrentUserType = () => {
  const { currentUser } = useAuth();

  return currentUser?.type === "entreprise" ? "entreprise" : "etudiant";
};
