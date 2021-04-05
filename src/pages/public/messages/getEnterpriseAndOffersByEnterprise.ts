import axios from "axios";
import { Enterprise, OffreStage } from "react-app-env";

export const getEnterpriseAndOffersByEnterprise = async (id: string) => {
  try {
    const enterprise: Enterprise = await (
      await axios.get(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_ENTERPRISES}/${id}`
      )
    ).data;
    const offers: OffreStage[] = await (
      await axios.get(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/${enterprise._id}`
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
