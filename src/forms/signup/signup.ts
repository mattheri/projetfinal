import { IForm } from "../../react-app-env";

export const signup: IForm[] = [
  {
    id: "signupUsername",
    type: "email",
    label: "Courriel",
    required: true,
    span: {
      sm: 12,
      md: 6,
    },
    values: null,
    value: "",
    row: 1,
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "L'adresse courriel est obligatoire";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Entrez une adresse courriel valide";
      }
    },
  },
  {
    id: "signupPassword",
    type: "password",
    label: "Mot de passe",
    span: {
      sm: 12,
      md: 6,
    },
    row: 2,
    values: null,
    value: "",
    required: true,
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Un mot de passe est requis";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        return "Le mot de passe doit contenir minimum 8 caractères, une lettre et un chiffre";
      }
    },
  },
  {
    id: "signupPasswordRetype",
    type: "password",
    label: "Retapez le mot de passe",
    span: {
      sm: 12,
      md: 6,
    },
    row: 2,
    values: null,
    value: "",
    required: true,
    validate: function (value: string, ...args) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est requis.";
      } else if (this.values && this.values[1].value !== value) {
        return "Ce champs doit etre identique au mot de passe.";
      }
    },
  },
];

signup.forEach((input) => (input.values = signup));
