import axios from "axios";

export const onSubmit = (
  onSuccess: () => void,
  entityId: string | undefined
) => {
  return async (values: { [key: string]: string }) => {
    try {
      const secteurs = Object.entries(values).map(([key, value]) => {
        if (key.includes("secteur") && !!value) {
          return key.replace("secteur", "");
        }
      });

      const enterprise = {
        nom: values.nom,
        nomPersonneContact: values.nomPersonneContact,
        prenomPersonneContact: values.prenomPersonneContact,
        courrielPersonneContact: values.courrielPersonneContact,
        telephone: values.telephone,
        adresse: values.adresse,
        ville: values.ville,
        codePostal: values.codePostal,
        siteWeb: values.siteWeb,
        logo: values.logo,
        description: values.description,
        secteurActivite: secteurs,
        actif: true,
        verifie: true,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_ENTERPRISES}/${entityId}`,
        enterprise
      );

      if (response.status === 200) {
        onSuccess();
      }
    } catch (err) {
      console.warn(err);
    }
  };
};
