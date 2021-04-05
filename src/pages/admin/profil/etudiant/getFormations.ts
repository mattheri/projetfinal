import { IForm, Formation } from "react-app-env";
import { queryFn } from "utils/queryFn";

export const getFormations = async () => {
  const formation: Formation[] = await queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_FORMATION}`
  )();
  let row = 4;

  return formation.map((formation, index) => {
    // For each formation retrieved, create a form object
    const formationCheckBox: IForm = {
      id: `formation${formation.nom}`,
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
      formationCheckBox.title = "Formation acquise ou en cours d'acquisition";
    }
    return formationCheckBox;
  });
};
