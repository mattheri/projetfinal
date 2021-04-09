import axios from "axios";
import { OffreStage } from "react-app-env";

export const handleSubmit = (
  selected: OffreStage | undefined,
  userId: string | undefined,
  handleOnSuccess: () => void
) => {
  return async (values: { [key: string]: string }) => {
    const secteurs = Object.entries(values)
      .map(([key, value]) => {
        if (key.includes("secteur")) {
          return key.replace("secteur", "");
        }
      })
      .filter(Boolean);
    const competences = Object.entries(values)
      .map(([key, value]) => {
        if (key.includes("competence")) {
          return value;
        }
      })
      .filter(Boolean);
    const formations = Object.entries(values)
      .map(([key, value]) => {
        if (key.includes("formation")) {
          console.log(value);
          return key.replace("formation", "");
        }
      })
      .filter(Boolean);

    try {
      const body = {
        titre: values.titre,
        entreprise: values.entreprise,
        secteurActivite: secteurs,
        ville: values.ville,
        dateDebut: new Date(values.dateDebut),
        dateFin: new Date(values.dateFin),
        description: values.description,
        nbHeuresSemaine: values.nbHeuresSemaine,
        remunere: values.remunere,
        emploiApresStage: values.emploiApresStage,
        dateParution: selected?.dateParution,
        informationsSupplementaires: values.informationsSupplementaires,
        actif: true,
        verifie: true,
        entityId: userId,
        competences: competences,
        salaire: values.salaire,
        duree: values.duree,
        formationRequise: formations,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/${selected?._id}`,
        body
      );
      console.log(response);
      if (response.status === 200) {
        handleOnSuccess();
      }
    } catch (err) {
      console.warn(err);
    }
  };
};
