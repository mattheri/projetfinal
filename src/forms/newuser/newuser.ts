import { IForm } from "react-app-env";

export const newuser: IForm[] = [
  {
    id: "newuserAddress",
    type: "text",
    label: "Adresse",
    required: true,
    span: {
      sm: 12,
    },
    row: 1,
    validate: (value: string) => {
      if (!value.length) {
        return "L'adresse est obligatoire.";
      }
    },
  },
  {
    id: "newuserCity",
    type: "text",
    label: "Ville",
    required: true,
    span: {
      sm: 12,
      md: 6,
      lg: 4,
    },
    row: 2,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "newuserPostalCode",
    type: "text",
    label: "Code Postal",
    required: true,
    span: {
      sm: 12,
      md: 6,
      lg: 4,
    },
    row: 2,
    validate: (value: string) => {
      if (!value.length) {
        return "L'adresse est obligatoire.";
      } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value)) {
        return "Entrez un code postal valide.";
      }
    },
  },
  {
    id: "newuserPhoneNumber",
    type: "text",
    label: "Téléphone",
    required: true,
    span: {
      sm: 12,
      lg: 4,
    },
    row: 2,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      } else if (!/^\d{10,11}$/.test(value)) {
        return "Utilisez le format xxxxxxxxxxxx";
      }
    },
  },
  {
    id: "newuserType",
    type: "select",
    label: "Je suis un...",
    required: false,
    span: {
      sm: 12,
    },
    row: 3,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
    options: [
      {
        value: "etudiant",
        text: "Futur stagiaire",
      },
      {
        value: "entreprise",
        text: "Potentiel employeur",
      },
    ],
  },
];
