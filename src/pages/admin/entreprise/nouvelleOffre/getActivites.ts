import axios from "axios";
import { SecteurActivite, IForm } from "react-app-env";

export const getActivites = (row: number) => {
  return async () => {
    const activites: SecteurActivite[] = await (
      await axios.get(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_ACTIVITY}`
      )
    ).data;
    return activites.map((secteur, index) => {
      // For each secteur retrieved, create a form object
      const secteurCheckBox: IForm = {
        id: "secteur" + secteur.nom,
        // Increment row value by one each 3 input
        // Since we add one input at the beginning
        // Needs to account for this
        row: index % 3 !== 2 || index === 0 ? row : row++,
        type: "checkbox",
        label: secteur.nom,
        span: {
          sm: 12,
          md: 4,
        },
      };

      if (index === 0) {
        secteurCheckBox.title = "Secteurs d'activité";
      }
      return secteurCheckBox;
    });
  };
};
