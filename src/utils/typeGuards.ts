import {
  DemandeStage,
  Enterprise,
  OffreStage,
  User,
  Student,
} from "../react-app-env";

export const isOffreDeStage = (
  t: any | any[]
): t is OffreStage | OffreStage[] => {
  if (Array.isArray(t)) {
    return (t as OffreStage[]).some((tt) => tt.entreprise);
  }

  return (t as OffreStage).entreprise !== undefined;
};

export const isUtilisateur = (t: any | any[]): t is User | User[] => {
  if (Array.isArray(t)) {
    return (t as User[]).some((tt) => tt.entiteId);
  }

  return (t as User).entiteId !== undefined;
};

export const isEntreprise = (
  t: any | any[]
): t is Enterprise | Enterprise[] => {
  if (Array.isArray(t)) {
    return (t as Enterprise[]).some((tt) => tt.siteWeb);
  }

  return (t as Enterprise).siteWeb !== undefined;
};

export const isDemandeDeStage = (
  t: any | any[]
): t is DemandeStage | DemandeStage[] => {
  if (Array.isArray(t)) {
    return (t as DemandeStage[]).some((tt) => tt.etudiant);
  }

  return (t as DemandeStage).etudiant !== undefined;
};

export const isStudent = (t: any | any[]): t is Student | Student[] => {
  if (Array.isArray(t)) {
    return (t as Student[]).some((tt) => tt.formations);
  }

  return (t as Student).formations !== undefined;
};
