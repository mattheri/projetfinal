import { IForm } from "react-app-env";

export const newstudent: IForm[] = [
  {
    id: "courriel",
    type: "email",
    label: "Courriel",
    required: true,
    span: {
      sm: 12,
    },
    row: 1,
    validate: (value: string) => {
      if (!value.length) {
        return "L'adresse courriel est obligatoire";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Entrez une adresse courriel valide";
      }
    },
  },
  {
    id: "prenom",
    type: "text",
    label: "Prénom",
    required: true,
    span: {
      sm: 12,
      md: 6,
    },
    row: 2,
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
    row: 2,
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
    row: 3,
  },
  {
    id: "ville",
    type: "text",
    label: "Ville",
    required: true,
    span: {
      sm: 12,
      md: 6,
      lg: 4,
    },
    row: 4,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "codePostal",
    type: "text",
    label: "Code Postal",
    required: true,
    span: {
      sm: 12,
      md: 6,
      lg: 4,
    },
    row: 4,
    validate: (value: string) => {
      if (!value.length) {
        return "L'adresse est obligatoire.";
      } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value)) {
        return "Entrez un code postal valide.";
      }
    },
  },
  {
    id: "telephone",
    type: "text",
    label: "Téléphone",
    required: true,
    span: {
      sm: 12,
      lg: 4,
    },
    row: 4,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      } else if (!/^\d{10,11}$/.test(value)) {
        return "Utilisez le format xxxxxxxxxxxx";
      }
    },
  },
];
