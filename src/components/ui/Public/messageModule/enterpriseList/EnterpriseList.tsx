import axios from "axios";
import { Enterprise, Message } from "react-app-env";
import { useQuery } from "react-query";
import Col from "react-bootstrap/Col";
import React from "react";
import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { Button, Badge } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { messageModuleState } from "state/messageModuleState";

type EnterpriseListProps = {
  entityId: string | undefined;
  id: string | undefined;
};

export const EnterpriseList = ({ entityId, id }: EnterpriseListProps) => {
  const [enterprises, setEnterprises] = React.useState<Enterprise[]>([]);
  const [
    currentMessageModuleState,
    setCurrentMessageModuleState,
  ] = useRecoilState(messageModuleState(id as string));
  /**
   * get all the enterprises
   */
  const getAllEntreprises = async (): Promise<Enterprise[]> => {
    try {
      const response: Enterprise[] = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_ENTERPRISES}`
        )
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
          `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}/${entityId}`
        )
      ).data;
      setEnterprises(await getAllEntreprises());
      return response;
    } catch (err) {
      return err;
    }
  };

  const { data, isLoading, isError } = useQuery(
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
