import axios from "axios";
import { IForm, Formation } from "react-app-env";

export const getFormations = (row: number) => {
  return async () => {
    const formations: Formation[] = await (
      await axios.get(`https://lit-shelf-44437.herokuapp.com/api/formation`)
    ).data;
    return formations.map((formation, index) => {
      // For each formation retrieved, create a form object
      const formationCheckBox: IForm = {
        id: "formation" + formation.nom,
        // Increment row value by one each 3 input
        // Since we add one input at the beginning
        // Needs to account for this
        row: index % 3 !== 2 || index === 0 ? row : row++,
        type: "checkbox",
        label: formation.nom,
        span: {
          sm: 12,
          md: 4,
        },
      };
      if (index === 0) {
        formationCheckBox.title = "Formations requises";
      }
      return formationCheckBox;
    });
  };
};
