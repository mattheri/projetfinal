/// <reference types="react-scripts" />
import { ColProps } from "react-bootstrap";

export interface User {
  _id: string;
  courriel: string;
  role: string;
  actif: boolean;
  verifie: boolean;
  premiereConnexion: boolean;
  entiteId: string;
  type: "etudiant" | "entreprise";
}

export interface Student {
  _id: string;
  nom: string;
  prenom: string;
  telephone: string;
  ville: string;
  competences: string[];
  formations: string[];
  cv: string;
  verifie: boolean;
}

export interface Enterprise {
  _id: string;
  nom: string;
  nomPersonneContact: string;
  prenomPersonneContact: string;
  courriel: string;
  telephone: string;
  adresse: string;
  ville: string;
  siteWeb: string;
  logo: string;
  descriptions: string;
  secteurActivites: string[];
  typesPostes: string[];
}

export interface Region {
  _id: string;
  nom: string;
  actif: boolean;
  verifie: boolean;
  slug: string;
}

export interface SecteurActivite {
  _id: string;
  nom: string;
  actif: boolean;
  verifie: boolean;
  slug: string;
}

export interface DemandeStage {
  _id: string;
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
  _id: string;
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

export interface Message {
  _id: string;
  input: string;
  output: string;
  message: string;
  date: Date;
  active: boolean;
  readInput: boolean;
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
      values?: IForm[] | null;
      value?: string;
      validate: (value: string) => string | undefined;
    }
  | {
      type: "textarea";
      id: string;
      placeholder: string;
      label?: string;
      required?: boolean;
      span?: ColProps;
      values?: IForm[] | null;
      value?: string;
      row: number;
      validate?: (value: string) => string | undefined;
    };
