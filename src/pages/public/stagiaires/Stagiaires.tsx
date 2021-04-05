import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useInfiniteQueryOnObserverPosition } from "../../../hooks/useInfiniteQueryOnObserverPosition";
import { Loading } from "../../../components/ui/Common/loading/Loading";
import { Error } from "../../../components/ui/Common/error/Error";
import { Student } from "../../../react-app-env";
import { LongCard } from "../../../components/ui/Common/card/LongCard/LongCard";
import { useFilter } from "../../../hooks/useFilter";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useModalMessages } from "../../../hooks/useModalMessages";
import { BannerCTA } from "../../../components/ui/Public/cta/BannerCTA/BannerCTA";
import { List } from "../../../components/ui/Common/list/List";
import { SquareButton } from "../../../components/ui/Common/squarebutton/SquareButton";
import { Sidebar } from "../../../components/ui/Public/sidebar/Sidebar";
import { CardsCta } from "../../../components/ui/Public/cta/CardsCta/CardsCta";

export const Stagiaires = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isError, isLoading } = useInfiniteQueryOnObserverPosition(
    ref,
    process.env.REACT_APP_STUDENTS
  );

  const filter = (filter: string, data: Student[]) => {
    if (filter) {
      return data.filter((offre) =>
        offre.formations.some((formation) => filter.includes(formation))
      );
    } else {
      return data;
    }
  };

  const { filteredData } = useFilter(
    process.env.REACT_APP_FORMATION as string,
    filter,
    data?.pages.map((page) => page.data.map((p: any) => p)).flat() as Student[]
  );

  const { handleShow, Modal } = useModalMessages();

  return (
    <main>
      <Container fluid className="py-5 d-flex position-relative">
        <AnimateSharedLayout>
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
                        footer={
                          <>
                            <Button
                              onClick={() =>
                                handleShow({
                                  to: etudiant._id,
                                  name: `${etudiant.prenom} ${etudiant.nom}`,
                                })
                              }
                              variant="link"
                              className="pl-0 mr-3"
                            >
                              Contacter
                            </Button>
                            <Button>Détails</Button>
                          </>
                        }
                      />
                    </Col>
                  </Row>
                );
              })}
            </Container>
          )}
          {isLoading && <Loading />}
          <div ref={ref}></div>
          <Sidebar
            title="Formations"
            resource={process.env.REACT_APP_FORMATION as string}
          />
        </AnimateSharedLayout>
      </Container>
      {Modal}
      <BannerCTA
        headline="Pourquoi publier une offre de stage?"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores explicabo consequatur rem, hic cum magni sit modi delectus saepe inventore, et ipsam, vero vitae praesentium impedit laudantium cumque velit doloribus!"
      >
        <List
          keys={[
            "Cras convallis tellus et elit aliquet 20%",
            "Suspendisse tincidunt vulputate leo in sollicitudi",
            "Morbi sodales risus quis orci hendrerit sempe",
          ]}
        />
        <SquareButton to="/entreprise/stages/new">
          Publier une offre de stage maintenant
        </SquareButton>
      </BannerCTA>
      <CardsCta resource={process.env.REACT_APP_INTERNSHIP_OFFER} />
    </main>
  );
};
