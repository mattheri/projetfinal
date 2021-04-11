/* eslint-disable */
import axios from "axios";
import { toast } from "react-hot-toast";

export const onSubmit = (userId: string | undefined, onSuccess: () => void) => {
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
        if (
          key.includes("formation") &&
          !key.includes("informationsSupplementaires")
        ) {
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
        dateParution: Date.now(),
        informationsSupplementaires: values.informationsSupplementaires,
        actif: true,
        verifie: true,
        entityId: userId,
        competences: competences,
        salaire: values.salaire,
        duree: values.duree,
        formationRequise: formations,
      };
      const response = await axios.post(
        `https://lit-shelf-44437.herokuapp.com/api/stage`,
        body
      );
      if (response.status === 200) {
        onSuccess();
        toast.success("Offre créée!");
      }
    } catch (err) {
      console.warn(err);
      toast.error("Une erreur est survenue.");
    }
  };
};
