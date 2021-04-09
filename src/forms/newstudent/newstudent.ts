import { IForm } from "react-app-env";

export const newstudent: IForm[] = [
  {
    id: "prenom",
    type: "text",
    label: "Prénom",
    required: true,
    span: {
      sm: 12,
      md: 6,
    },
    row: 1,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "nom",
    type: "text",
    label: "Nom",
    required: true,
    span: {
      sm: 12,
      md: 6,
    },
    row: 1,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "cv",
    type: "text",
    label: "Lien vers votre CV",
    required: false,
    span: {
      sm: 12,
    },
    row: 2,
  },
  {
    id: "startDate",
    type: "datepicker",
    label: "Date de début du stage",
    required: true,
    span: {
      sm: 12,
      md: 4,
    },
    row: 3,
    validate: function (value: string) {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "degreeEndDate",
    type: "datepicker",
    label: "Date de fin du programme",
    required: true,
    span: {
      sm: 12,
      md: 4,
    },
    row: 3,
    validate: function (value: string) {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "duree",
    type: "text",
    label: "Durée (en semaine)",
    required: false,
    span: {
      sm: 12,
      md: 4,
    },
    row: 3,
    validate: function (value: string) {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      } else if (/\D|\s/.test(value)) {
        return "Ce champs n'accepte que des chiffres.";
      }
    },
  },
  {
    id: "about",
    type: "textarea",
    label: "Décrivez-vous",
    required: false,
    span: {
      sm: 12,
    },
    row: 4,
  },
];
