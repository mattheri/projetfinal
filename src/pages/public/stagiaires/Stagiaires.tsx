import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useInfiniteQueryOnObserverPosition } from "../../../hooks/useInfiniteQueryOnObserverPosition";
import { Loading } from "../../../components/ui/Common/loading/Loading";
import { Error } from "../../../components/ui/Common/error/Error";
import { Student } from "../../../react-app-env";
import { LongCard } from "../../../components/ui/card/LongCard/LongCard";
import { useFilter } from "../../../hooks/useFilter";
import { motion } from "framer-motion";

export const Stagiaires = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isError, isLoading } = useInfiniteQueryOnObserverPosition(
    ref,
    process.env.REACT_APP_STUDENTS
  );

  const filter = (filter: string, data: Student[]) => {
    if (filter) {
      return data.filter((offre) =>
        offre.formations.some((formation) => formation === filter)
      );
    } else {
      return data;
    }
  };

  const { filteredData } = useFilter(
    process.env.REACT_APP_STUDENTS as string,
    filter,
    data?.pages.map((page) => page.data.map((p: any) => p)).flat() as Student[]
  );

  return (
    <>
      <Container fluid className="py-5">
        {isError && <Error />}
        {filteredData && (
          <Container>
            {filteredData.map((etudiant: Student) => {
              return (
                <Row layout className="mx-2" as={motion.div}>
                  <Col>
                    <LongCard
                      title={`${etudiant.prenom} ${etudiant.nom}`}
                      sub={etudiant.formations?.join(" ")}
                      body={etudiant.competences?.join(" ")}
                      footer={etudiant._id}
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
