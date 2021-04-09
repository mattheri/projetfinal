import axios from "axios";
import { Formation, IForm } from "react-app-env";

export const getFormations = async () => {
  const response: Formation[] = await (
    await axios.get(
      `${process.env.REACT_APP_API}${process.env.REACT_APP_FORMATION}`
    )
  ).data;
  let row = 4;
  const formations: IForm[] = response.map((formation, index) => {
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
    return formationCheckBox;
  });
  formations[0].title = "Formations en cours";
  return formations;
};
