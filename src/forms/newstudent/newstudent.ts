import { IForm } from "../../react-app-env";

export const newstudent: IForm[] = [
  {
    id: "newstudentFirstname",
    type: "text",
    label: "Prénom",
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
    id: "newstudentLastname",
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
    id: "newstudentCV",
    type: "text",
    label: "Lien vers votre CV",
    required: false,
    span: {
      sm: 12,
    },
    row: 2,
  },
];
