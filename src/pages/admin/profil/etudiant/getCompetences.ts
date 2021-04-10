import { IForm, Student } from "react-app-env";

export const getCompetences = (student: Student, form: IForm[]) => {
  return async () =>
    student.competences.map((competence, index) => {
      return {
        id: `competence${form.length + index}`,
        type: "text",
        label: "Compétence",
        required: false,
        span: {
          sm: 12,
        },
        row: 20,
        values: null,
        value: "",
        validate: function (value: string) {
          this.value = value;
          return "";
        },
      };
    });
};
