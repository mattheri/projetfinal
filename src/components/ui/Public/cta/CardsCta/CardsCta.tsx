import _chunk from "lodash/chunk";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useQueryOnObserverPosition } from "../../../../../hooks/useQueryOnObserverPosition";
import { OffreStage, Student, User } from "../../../../../react-app-env";
import { isOffreDeStage } from "../../../../../utils/typeGuards";
import { SmallCard } from "../../../card/SmallCard/SmallCard";
import { Empty } from "../../../Common/empty/Empty";
import { Error } from "../../../Common/error/Error";
import { Loading } from "../../../Common/loading/Loading";
import { RouterLink } from "../../../Common/routerlink/RouterLink";

type CardsCtaProps = {
  resource?: string;
};

export const CardsCta = ({
  resource,
  children,
}: React.PropsWithChildren<CardsCtaProps>) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { isLoading, isError, data } = useQueryOnObserverPosition(
    ref,
    resource
  );

  return (
    <Container ref={ref} fluid>
      {isError && <Error />}
      {isLoading && <Loading />}
      {data && !data.length && <Empty />}
      {data && (
        <>
          {isOffreDeStage(data) ? (
            <>
              <Row className="mx-lg-5">
                {_chunk(data as OffreStage[], 4)[0].map((offre) => {
                  return (
                    <Col key={offre._id} sm={12} md={6} lg={3} className="mb-3">
                      <SmallCard
                        title={offre.titre}
                        subtitle={offre.entreprise}
                        body={offre.description}
                        footer={
                          <>
                            <RouterLink
                              variant="link"
                              className="mr-3 pl-0"
                              to={`/stage/${offre._id}`}
                            >
                              Détails
                            </RouterLink>
                            <RouterLink to={`/stage/${offre._id}`}>
                              Contacter
                            </RouterLink>
                          </>
                        }
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row className="my-5">
                <Col className="d-flex justify-content-center">
                  <RouterLink to="/stages" variant="danger">
                    Voir toutes les offres de stage
                  </RouterLink>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row className="mx-lg-5">
                {_chunk(data as Student[], 4)[0].map((stagiaire) => {
                  return (
                    <Col
                      key={stagiaire._id}
                      sm={12}
                      md={6}
                      lg={3}
                      className="mb-3"
                    >
                      <SmallCard
                        title={`${stagiaire.prenom} ${stagiaire.nom}`}
                        subtitle={stagiaire.competences
                          .map((competence) => competence)
                          .join(" ")}
                        body={stagiaire.formations
                          .map((formation) => formation)
                          .join(" ")}
                        footer={
                          <>
                            <RouterLink
                              variant="link"
                              className="mr-3 pl-0"
                              to={`/stagiaire/${stagiaire._id}`}
                            >
                              Détails
                            </RouterLink>
                            <RouterLink to={`/stagiaire/${stagiaire._id}`}>
                              Contacter
                            </RouterLink>
                          </>
                        }
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row className="my-5">
                <Col className="d-flex justify-content-center">
                  <RouterLink to="/stagiaires" variant="danger">
                    Voir tous les candidats
                  </RouterLink>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};
