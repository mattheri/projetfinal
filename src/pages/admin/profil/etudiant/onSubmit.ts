import axios from "axios";

export const onSubmit = (
  onSuccess: () => void,
  entityId: string | undefined,
  id: string | undefined
) => {
  return async (values: { [key: string]: string }) => {
    try {
      const formations = Object.entries(values)
        .map(([key, value]) => {
          if (key.includes("formation") && !!value) {
            return key.replace("formation", "");
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

      const student = {
        nom: values.nom,
        prenom: values.prenom,
        telephone: values.telephone,
        ville: values.ville,
        codePostal: values.codePostal,
        cv: values.cv,
        about: values.about,
        startDate: values.startDate,
        duree: values.duree,
        degreeEndDate: values.degreeEndDate,
        formations: formations,
        competences: competences,
        actif: true,
        verifie: true,
      };

      const user = {
        courriel: values.courriel,
      };

      await axios.put(
        `https://lit-shelf-44437.herokuapp.com/api/etudiant/${entityId}`,
        student
      );
      await axios.put(
        `https://lit-shelf-44437.herokuapp.com/api/utilisateur/${id}`,
        user
      );
    } catch (err) {
      console.warn(err);
    }
  };
};
