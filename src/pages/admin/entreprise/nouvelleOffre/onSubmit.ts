import axios from "axios";

export const onSubmit = (userId: string | undefined, onSuccess: () => void) => {
  return async (values: { [key: string]: string }) => {
    const secteurs = Object.entries(values)
      .map(([key, value]) => {
        if (key.includes("sector")) {
          return key.replace("sector", "");
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
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}`,
        body
      );
      if (response.status === 200) {
        onSuccess();
      }
    } catch (err) {
      console.warn(err);
    }
  };
};
