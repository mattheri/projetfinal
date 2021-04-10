/* eslint-disable */
import axios from "axios";
import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import { Loading } from "components/ui/Common/loading/Loading";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import React from "react";
import { Enterprise, Message } from "react-app-env";
import Col from "react-bootstrap/Col";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { messageModuleState } from "state/messageModuleState";

type EnterpriseListProps = {
  entityId: string | undefined;
  id: string | undefined;
};

export const EnterpriseList = ({ entityId, id }: EnterpriseListProps) => {
  const [enterprises, setEnterprises] = React.useState<Enterprise[]>([]);
  const [, setCurrentMessageModuleState] = useRecoilState(
    messageModuleState(id as string)
  );
  /**
   * get all the enterprises
   */
  const getAllEntreprises = async (): Promise<Enterprise[]> => {
    try {
      const response: Enterprise[] = await (
        await axios.get(`https://lit-shelf-44437.herokuapp.com/api/entreprise`)
      ).data;
      return response;
    } catch (err) {
      return err;
    }
  };

  /**
   * with the enterprises, get all the messages related to those enterprise and the current student
   */
  const getAllMessagesFromCurrentStudent = async (): Promise<Message[]> => {
    try {
      const response: Message[] = await (
        await axios.get(
          `https://lit-shelf-44437.herokuapp.com/api/message/${entityId}`
        )
      ).data;
      setEnterprises(await getAllEntreprises());
      return response;
    } catch (err) {
      return err;
    }
  };

  const { data, isLoading } = useQuery(
    entityId as string,
    getAllMessagesFromCurrentStudent,
    { enabled: !!entityId }
  );

  const filterMessagesByEnterpriseId = (
    id: string,
    messages: Message[]
  ): Message[] => {
    return messages.filter((message) => {
      if (message.from === id || message.to === id) {
        return message;
      }
    });
  };

  const handleSelectEnterprise = (
    enterprise: Enterprise,
    messages: Message[]
  ) => {
    setCurrentMessageModuleState((state) =>
      Object.assign({}, state, {
        enterpriseSelected: enterprise,
        selectedMessages: filterMessagesByEnterpriseId(
          enterprise._id,
          messages
        ),
      })
    );
  };

  return (
    <>
      {isLoading && <Loading />}
      {enterprises.length > 0 &&
        enterprises?.map((enterprise) => (
          <Col lg={4} className="mb-4">
            <SmallCard
              title={enterprise.nom}
              body={enterprise.description}
              footer={
                <>
                  <RouterLink to={`/stages`}>
                    Voir les offres de stage
                  </RouterLink>
                  <RouterLink
                    to={`enterprise/${enterprise._id}`}
                    variant="link"
                    onClick={() =>
                      data && handleSelectEnterprise(enterprise, data)
                    }
                  >
                    Messages
                  </RouterLink>
                </>
              }
            />
          </Col>
        ))}
    </>
  );
};
