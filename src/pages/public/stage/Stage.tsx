import React from "react";
import { useParams } from "react-router-dom";
import { queryFn } from "utils/queryFn";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Loading } from "components/ui/Common/loading/Loading";
import { Error } from "components/ui/Common/error/Error";
import { OffreStage } from "react-app-env";
import { SmallText } from "components/ui/Common/smalltext/SmallText";
import { DateTime } from "luxon";

const queryKey = uuidv4();

export const Stage = () => {
  const params = useParams();

  const query = queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/${params.id}`
  );

  const { data, isLoading, isError } = useQuery(queryKey, query);

  return (
    <main>
      <Container>
        {isLoading && <Loading />}
        {isError && <Error />}
        {(data as OffreStage) && (
          <>
            <Row>
              <Col md={8}>
                <h1>{data.titre}</h1>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <SmallText>
                      Date de parution:{" "}
                      {DateTime.fromISO(data.dateParution).toLocaleString()}
                    </SmallText>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>
                  {data.entreprise} - {data.ville}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <SmallText>{data.secteurActivite.join("-")}</SmallText>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={4}>
                <h5>Emploi possible après le stage?</h5>
                <SmallText>{data.emploiApresStage ? "Oui" : "Non"}</SmallText>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <h5>Rémunéré?</h5>
                <SmallText>
                  {data.remunere ? `Oui - ${data.salaire}$/h` : "Non"}
                </SmallText>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <h5>Nombre d'heures par semaine</h5>
                <SmallText>{data.nbHeuresSemaine}</SmallText>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h5>Description du stage</h5>
              </Col>
              <Col xs={12}>
                <SmallText>{data.description}</SmallText>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </main>
  );
};
