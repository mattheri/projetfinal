import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useInfiniteQueryOnObserverPosition } from "hooks/useInfiniteQueryOnObserverPosition";
import { Student } from "react-app-env";
import { LongCard } from "components/ui/Common/card/LongCard/LongCard";
import { useFilter } from "hooks/useFilter";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useModalMessages } from "hooks/useModalMessages";
import { BannerCTA } from "components/ui/Public/cta/BannerCTA/BannerCTA";
import { List } from "components/ui/Common/list/List";
import { SquareButton } from "components/ui/Common/squarebutton/SquareButton";
import { Sidebar } from "components/ui/Public/sidebar/Sidebar";
import { CardsCta } from "components/ui/Public/cta/CardsCta/CardsCta";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { Loader } from "components/ui/Common/loader/Loader";
import { ContactButton } from "components/ui/Public/contactButton/ContactButton";

export const Stagiaires = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, status, isFetching } = useInfiniteQueryOnObserverPosition(
    ref,
    "etudiant"
  );

  const filter = (filter: string, data: Student[]) => {
    if (filter && data) {
      return data.filter((offre) =>
        offre.formations.some((formation) => filter.includes(formation))
      );
    } else {
      return data;
    }
  };

  const { filteredData } = useFilter(
    "formation" as string,
    filter,
    data?.pages.map((page) => page.data.map((p: any) => p)).flat() as Student[]
  );

  const { handleShow, Modal } = useModalMessages();

  return (
    <main>
      <Container fluid className="py-5 d-flex position-relative">
        <AnimateSharedLayout>
          <Loader
            status={status}
            component={
              filteredData && (
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
                                <ContactButton
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
                                </ContactButton>
                                <RouterLink to={`/stagiaire/${etudiant._id}`}>
                                  Détails
                                </RouterLink>
                              </>
                            }
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Container>
              )
            }
          />
          {!isFetching && <div ref={ref}></div>}
          <Sidebar title="Formations" resource={"formation" as string} />
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
        <SquareButton to="/admin">
          Publier une offre de stage maintenant
        </SquareButton>
      </BannerCTA>
      <CardsCta resource={"stage"} />
    </main>
  );
};
