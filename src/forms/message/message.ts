import { IForm } from "../../react-app-env";

export const message: IForm[] = [
  {
    id: "message",
    type: "textarea",
    label: "Votre message",
    required: true,
    span: {
      sm: 12,
    },
    row: 1,
    validate: (value: string) => {
      if (!value.length) {
        return "Un message est obligatoire.";
      }
    },
  },
];
