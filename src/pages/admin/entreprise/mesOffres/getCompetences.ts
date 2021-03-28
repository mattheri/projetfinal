import { IForm, OffreStage } from "react-app-env";

export const getCompetences = (selected: OffreStage, form: IForm[]) => {
  return async () =>
    selected.competences.map((competence, index) => {
      return {
        id: `competence${form.length + index}`,
        type: "text",
        label: "Compétence",
        required: false,
        span: {
          sm: 12,
        },
        row: form.length,
        values: null,
        value: "",
        validate: function (value: string) {
          this.value = value;
          return "";
        },
      };
    });
};
