import { IForm } from "../../react-app-env";

export const login: IForm[] = [
  {
    id: "loginUsername",
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
    id: "loginPassword",
    type: "password",
    label: "Mot de passe",
    span: {
      sm: 12,
    },
    validate: (value: string) => {
      if (!value.length) {
        return "Un mot de passe est requis";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        return "Le mot de passe doit contenir minimum 8 caractères, une lettre et un chiffre";
      }
    },
    row: 2,
    required: true,
  },
];
