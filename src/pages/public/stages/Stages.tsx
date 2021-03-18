import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useInfiniteQueryOnObserverPosition } from "../../../hooks/useInfiniteQueryOnObserverPosition";
import { Loading } from "../../../components/ui/Common/loading/Loading";
import { Error } from "../../../components/ui/Common/error/Error";
import { OffreStage } from "../../../react-app-env";
import { LongCard } from "../../../components/ui/card/LongCard/LongCard";
import { useFilter } from "../../../hooks/useFilter";
import { motion } from "framer-motion";

export const Stages = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isError, isLoading } = useInfiniteQueryOnObserverPosition(
    ref,
    process.env.REACT_APP_INTERNSHIP_OFFER
  );

  const filter = (filter: string, data: OffreStage[]) => {
    if (filter) {
      return (
        data &&
        data.filter((offre) =>
          offre.secteurActivite.some((secteur) => secteur === filter)
        )
      );
    } else {
      return data && data;
    }
  };

  const { filteredData } = useFilter(
    process.env.REACT_APP_INTERNSHIP_OFFER as string,
    filter,
    data?.pages
      .map((page) => page.data.map((p: any) => p))
      .flat() as OffreStage[]
  );

  return (
    <>
      <Container fluid className="py-5">
        {isError && <Error />}
        {filteredData && (
          <Container>
            {filteredData.map((offre: OffreStage) => {
              return (
                <Row layout className="mx-2" as={motion.div}>
                  <Col>
                    <LongCard
                      title={offre.titre}
                      subtitle={offre.entreprise}
                      sub={offre.competences?.join(" ")}
                      body={offre.description}
                      footer={offre._id}
                    />
                  </Col>
                </Row>
              );
            })}
          </Container>
        )}
        {isLoading && <Loading />}
        <div ref={ref}></div>
      </Container>
    </>
  );
};
