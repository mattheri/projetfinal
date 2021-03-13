/// <reference types="react-scripts" />
import { ColProps } from "react-bootstrap";

export interface User {
  nom: string;
  prenom: string;
  courriel: string;
  telephone: string;
  ville: string;
  competences: string[];
  formations: string[];
  cv: string;
  message: string;
  role: string;
}

export interface Enterprise {
  nom: string;
  nomPersonneContact: string;
  prenomPersonneContact: string;
  courriel: string;
  telephone: string;
  adresse: string;
  ville: string;
  stieWeb: string;
  logo: string;
  descriptions: string;
  secteurActivites: string[];
  typesPostes: string[];
}

export interface Region {
  nom: string;
}

export interface SecteurActivite {
  nom: string;
}

export interface DemandeStage {
  titre: string;
  programmeSuivi: string;
  autresFormations: string[];
  competences: string[];
  descriptionPosteRecherche: string;
  ville: string;
  dateDebut: Date;
  dateFin: Date;
  nbHeuresSemaine: number;
  type: string;
  duree: number;
  remunere: boolean;
  dateParution: Date;
  autresInformations: string;
  etudiant: string;
}

export interface OffreStage {
  titre: string;
  entreprise: string;
  secteurActivite: string[];
  ville: string;
  dateDebut: Date;
  dateFin: Date;
  duree: number;
  description: string;
  nbHeuresSemaine: number;
  competences: string[];
  remunere: boolean;
  emploiApresStage: boolean;
  dateParution: Date;
  informationsSupplementaires: string;
  vedette: boolean;
}

export type IForm =
  | {
      type: string;
      id: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      span?: ColProps;
      row: number;
      validate: (value: string) => string | undefined;
    }
  | {
      type: "textarea";
      id: string;
      placeholder: string;
      label?: string;
      required?: boolean;
      span?: ColProps;
      row: number;
      validate?: (value: string) => string | undefined;
    };
