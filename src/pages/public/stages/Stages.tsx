import { motion, AnimateSharedLayout } from "framer-motion";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { LongCard } from "components/ui/Common/card/LongCard/LongCard";
import { List } from "components/ui/Common/list/List";
import { Loading } from "components/ui/Common/loading/Loading";
import { SquareButton } from "components/ui/Common/squarebutton/SquareButton";
import { BannerCTA } from "components/ui/Public/cta/BannerCTA/BannerCTA";
import { CardsCta } from "components/ui/Public/cta/CardsCta/CardsCta";
import { Sidebar } from "components/ui/Public/sidebar/Sidebar";
import { useFilter } from "hooks/useFilter";
import { useInfiniteQueryOnObserverPosition } from "hooks/useInfiniteQueryOnObserverPosition";
import { OffreStage } from "react-app-env";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { Loader } from "components/ui/Common/loader/Loader";

export const Stages = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, status, isFetching } = useInfiniteQueryOnObserverPosition(
    ref,
    "stage"
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
    "activite" as string,
    filter,
    data?.pages
      .map((page) => page.data.map((p: any) => p))
      .flat() as OffreStage[]
  );

  return (
    <main>
      <Container fluid className="py-5 d-flex position-relative">
        <AnimateSharedLayout>
          <Loader
            component={
              filteredData && (
                <Container>
                  {filteredData.map((offre: OffreStage) => {
                    return (
                      <React.Suspense key={offre._id} fallback={<Loading />}>
                        <Row layout className="mx-2" as={motion.div}>
                          <Col>
                            <LongCard
                              title={offre.titre}
                              subtitle={offre.entreprise}
                              sub={offre.competences?.join(" ")}
                              body={offre.description}
                              footer={
                                <RouterLink to={`/stage/${offre._id}`}>
                                  En savoir plus
                                </RouterLink>
                              }
                            />
                          </Col>
                        </Row>
                      </React.Suspense>
                    );
                  })}
                </Container>
              )
            }
            status={status}
          />
          {!isFetching && <div ref={ref}></div>}
          <Sidebar
            title="Secteurs d'activité"
            resource={"activite" as string}
          />
        </AnimateSharedLayout>
      </Container>
      <BannerCTA
        imagePosition="right"
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
      <CardsCta resource={"etudiant"} />
    </main>
  );
};
