import axios from "axios";
import { Enterprise, OffreStage } from "react-app-env";

export const getEnterpriseAndOffersByEnterprise = async (id: string) => {
  try {
    const enterprise: Enterprise = await (
      await axios.get(
        `https://lit-shelf-44437.herokuapp.com/api/entreprise/${id}`
      )
    ).data;
    const offers: OffreStage[] = await (
      await axios.get(
        `https://lit-shelf-44437.herokuapp.com/api/stage/${enterprise._id}`
      )
    ).data;

    return {
      entreprise: enterprise,
      offres: offers,
    };
  } catch (err) {
    console.warn(err);
  }
};
