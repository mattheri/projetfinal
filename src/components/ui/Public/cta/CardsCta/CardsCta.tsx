import _chunk from "lodash/chunk";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useModalMessages } from "hooks/useModalMessages";
import { useQueryOnObserverPosition } from "hooks/useQueryOnObserverPosition";
import { OffreStage, Student } from "react-app-env";
import { isOffreDeStage } from "utils/typeGuards";
import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import { Empty } from "components/ui/Common/empty/Empty";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { Loader } from "components/ui/Common/loader/Loader";
import { ContactButton } from "components/ui/Public/contactButton/ContactButton";

type CardsCtaProps = {
  resource?: string;
};

export const CardsCta = ({
  resource,
  children,
}: React.PropsWithChildren<CardsCtaProps>) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { data, status } = useQueryOnObserverPosition(ref, resource);

  const { handleShow, Modal } = useModalMessages();

  return (
    <Container ref={ref} fluid>
      {data && !data.length && <Empty />}
      <Loader
        component={
          data && (
            <>
              {isOffreDeStage(data) ? (
                <>
                  <Row className="mx-lg-5">
                    {data.length > 0 &&
                      _chunk(data as OffreStage[], 4)[0].map((offre) => {
                        return (
                          <Col
                            key={offre._id}
                            sm={12}
                            md={6}
                            lg={3}
                            className="mb-3"
                          >
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
                                  <ContactButton
                                    onClick={() =>
                                      handleShow({
                                        to: offre._id,
                                        name: offre.titre,
                                      })
                                    }
                                  >
                                    Contacter
                                  </ContactButton>
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
                    {data.length > 0 &&
                      _chunk(data as Student[], 4)[0].map((stagiaire) => {
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
                              subtitle={stagiaire.competences.join(" ")}
                              body={stagiaire.formations.join(" ")}
                              footer={
                                <>
                                  <RouterLink
                                    variant="link"
                                    className="mr-3 pl-0"
                                    to={`/stagiaire/${stagiaire._id}`}
                                  >
                                    Détails
                                  </RouterLink>
                                  <ContactButton
                                    onClick={() =>
                                      handleShow({
                                        to: stagiaire._id,
                                        name: `${stagiaire.prenom} ${stagiaire.nom}`,
                                      })
                                    }
                                  >
                                    Contacter
                                  </ContactButton>
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
          )
        }
        status={status}
      />
      {Modal}
    </Container>
  );
};
