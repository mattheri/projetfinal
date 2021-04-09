import axios from "axios";
import { SecteurActivite, IForm } from "react-app-env";

export const getActivities = () => {
  return async () => {
    const sectors: SecteurActivite[] = await (
      await axios.get(`https://lit-shelf-44437.herokuapp.com/api/activite`)
    ).data;
    let row = 6;
    return sectors.map((sector, index) => {
      // For each sector retrieved, create a form object
      const sectorCheckBox: IForm = {
        id: "secteur" + sector.nom,
        // Increment row value by one each 3 input
        // Since we add one input at the beginning
        // Needs to account for this
        row: index % 3 !== 2 || index === 0 ? row : row++,
        type: "checkbox",
        label: sector.nom,
        span: {
          sm: 12,
          md: 4,
        },
      };
      return sectorCheckBox;
    });
  };
};
