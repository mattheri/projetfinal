import { queryFn } from "utils/queryFn";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { Message, OffreStage } from "react-app-env";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import Badge from "react-bootstrap/Badge";
import { Empty } from "components/ui/Common/empty/Empty";
import { Loading } from "components/ui/Common/loading/Loading";

export const EnterpriseOffersAndMessages = () => {
  const params = useParams();
  const { currentUser } = useAuth();

  const enterpriseOffersQuery = queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/entreprise/${params.id}`
  );
  const offers = useQuery(
    [currentUser?._id, params.id],
    enterpriseOffersQuery,
    { enabled: !!params.id }
  );
  const queryOffersMessagesFromStudent = async (id: string) => {
    return queryFn(
      "get",
      `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}?from=${currentUser?.entiteId}&to=${id}`
    )();
  };
  const queryAllOffers = async (): Promise<Message[][]> => {
    return Promise.all(
      (offers.data as OffreStage[]).map((offer) =>
        queryOffersMessagesFromStudent(offer._id)
      )
    );
  };
  const offersMessages = useQuery(
    [currentUser?._id, params.id, "messages"],
    queryAllOffers,
    { enabled: !!offers.data }
  );

  const filterMessagesByOffer = (id: string) => {
    return offersMessages.data?.flatMap((msg) =>
      msg.filter((msg) => {
        if (msg.from === id || msg.to === id) {
          return msg;
        }
      })
    ).length;
  };

  return (
    <>
      {offers.data && offers.data.length === 0 && <Empty />}
      {offers.isLoading && <Loading />}
      {offers.data &&
        (offers.data as OffreStage[]).map((offer) => (
          <Col lg={4} className="mb-4">
            <SmallCard
              title={offer.titre}
              body={offer.description}
              footer={
                <>
                  <RouterLink to={`/stage/${offer._id}`}>
                    Voir l'offre
                  </RouterLink>
                  <RouterLink
                    variant="link"
                    to={`/messages/${offer._id}/${currentUser?.entiteId}`}
                  >
                    Messages <Badge>{filterMessagesByOffer(offer._id)}</Badge>
                  </RouterLink>
                </>
              }
            />
          </Col>
        ))}
      <Container>
        <RouterLink
          block
          to={`/messages/${params.id}/${currentUser?.entiteId}`}
        >
          Voir les mesages à l'entreprise
        </RouterLink>
      </Container>
    </>
  );
};
