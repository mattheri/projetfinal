import { Message, OffreStage } from "react-app-env";
import axios from "axios";
import { getMessagesPerStudentOrEnterpriseId } from "./getMessages";

export const getMessagesByEntityIdAndByOfferId = async (
  id: string,
  offers: () => Promise<OffreStage[]>
) => {
  const enterpriseMessages: Message[] = await getMessagesPerStudentOrEnterpriseId(
    id
  )();
  const offres = await offers();
  const offersMessages: {
    id: string;
    messages: Message[];
  }[] =
    offres &&
    (await Promise.all(
      offres.map(async (offer) => ({
        id: offer._id,
        messages: await getMessagesPerStudentOrEnterpriseId(offer._id)(),
      }))
    ));

  return {
    entreprise: enterpriseMessages,
    offres: offersMessages,
  };
};
