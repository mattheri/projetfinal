import { IForm } from "../../react-app-env";

export const newenterprise: IForm[] = [
  {
    id: "newenterpriseName",
    type: "text",
    label: "Nom",
    required: true,
    span: {
      sm: 12,
    },
    row: 1,
    validate: (value: string) => {
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "newenterpriseContactFirstname",
    type: "text",
    label: "Prénom de la personne contact",
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
    id: "newenterpriseContactLastname",
    type: "text",
    label: "Nom de la personne contact",
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
    id: "newenterpriseContactEmail",
    type: "text",
    label: "Courriel de la personne contact",
    required: true,
    span: {
      sm: 12,
      lg: 4,
    },
    row: 2,
    validate: (value: string) => {
      if (!value.length) {
        return "L'adresse courriel est obligatoire";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Entrez une adresse courriel valide";
      }
    },
  },
  {
    id: "newenterpriseWebsite",
    type: "text",
    label: "Site Web",
    required: false,
    span: {
      sm: 12,
      md: 6,
    },
    row: 3,
  },
  {
    id: "newenterpriseLogo",
    type: "text",
    label: "Logo",
    required: false,
    span: {
      sm: 12,
      md: 6,
    },
    row: 3,
  },
  {
    id: "newenterpriseDescription",
    type: "textarea",
    label: "C'est quoi travailler chez vous?",
    required: false,
    span: {
      sm: 12,
    },
    row: 4,
  },
];
