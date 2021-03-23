import axios from "axios";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useRecoilState } from "recoil";
import { useAuth } from "../../../../../hooks/useAuth";
import { useGetQuery } from "../../../../../hooks/useGetQuery";
import { Message, OffreStage } from "../../../../../react-app-env";
import { messageModuleState } from "../../../../../state/messageModuleState";
import { Empty } from "../../../Common/empty/Empty";
import { Loading } from "../../../Common/loading/Loading";
import { SmallText } from "../../../Common/smalltext/SmallText";

export const OfferList = () => {
  const { currentUser } = useAuth();
  const [
    currentMessageModuleState,
    setCurrentMessageModuleState,
  ] = useRecoilState(messageModuleState(currentUser?._id as string));
  const { data } = useGetQuery(
    `${process.env.REACT_APP_INTERNSHIP_OFFER}/entreprise/${currentUser?._id}`
  );
  const [offers, setOffers] = React.useState<OffreStage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const getOfferThatHaveMessages = async (id: string) => {
    try {
      const response: Message[] = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}/${id}`
        )
      ).data;
      console.log(response);
      setCurrentMessageModuleState((state) =>
        Object.assign({}, state, { messages: response })
      );
      return response;
    } catch (err) {
      console.warn(err);
      return err;
    }
  };
  const handleGetOffersWithMessages = async () => {
    const offers: OffreStage[] = await Promise.all(
      (data as OffreStage[]).map((offre) => getOfferThatHaveMessages(offre._id))
    );
    setOffers(offers);
    setIsLoading(false);
  };
  React.useEffect(() => {
    if (data && (data as any[]).length > 0) {
      handleGetOffersWithMessages();
    }
    if (data && (data as any[]).length === 0) {
      setIsLoading(false);
    }
  }, [offers, data]);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && offers.length === 0 && <Empty />}
      {offers.length > 0 && (
        <ListGroup>
          {offers.map((offre) => {
            return (
              <ListGroup.Item>
                <span>
                  <SmallText>{offre.titre}</SmallText>
                  <SmallText condensed>{offre.dateParution}</SmallText>
                </span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
};
