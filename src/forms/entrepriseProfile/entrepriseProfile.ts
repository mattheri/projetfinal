import { IForm } from "react-app-env";

export const entrepriseProfile: IForm[] = [
  {
    id: "adresse",
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
    id: "ville",
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
    id: "codePostal",
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
    id: "telephone",
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
    id: "nom",
    type: "text",
    label: "Nom de l'entreprise",
    required: true,
    span: {
      sm: 12,
    },
    row: 3,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "prenomPersonneContact",
    type: "text",
    label: "Prénom de la personne contact",
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
    id: "nomPersonneContact",
    type: "text",
    label: "Nom de la personne contact",
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
    id: "courrielPersonneContact",
    type: "text",
    label: "Courriel de la personne contact",
    required: true,
    span: {
      sm: 12,
      lg: 4,
    },
    row: 4,
    validate: (value: string) => {
      if (!value.length) {
        return "L'adresse courriel est obligatoire";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Entrez une adresse courriel valide";
      }
    },
  },
  {
    id: "siteWeb",
    type: "text",
    label: "Site Web",
    required: false,
    span: {
      sm: 12,
      md: 6,
    },
    row: 5,
  },
  {
    id: "logo",
    type: "text",
    label: "Logo",
    required: false,
    span: {
      sm: 12,
      md: 6,
    },
    row: 5,
  },
  {
    id: "description",
    type: "textarea",
    label: "C'est quoi travailler chez vous?",
    required: false,
    span: {
      sm: 12,
    },
    row: 6,
  },
];
