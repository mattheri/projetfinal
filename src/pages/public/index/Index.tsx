import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import usageImage from "assets/images/cta.png";
import { BannerCTA } from "components/ui/Public/cta/BannerCTA/BannerCTA";
import { CardsCta } from "components/ui/Public/cta/CardsCta/CardsCta";
import { CTA } from "components/ui/Public/cta/CTA/CTA";
import { List } from "components/ui/Common/list/List";
import { SquareButton } from "components/ui/Common/squarebutton/SquareButton";

export const Index = () => {
  return (
    <main>
      <CTA
        headline="Tu es à la recherche de ton stage de fin d'études?"
        subtitle="Pellentesque vehicula fermentum turpis eu cursus. Cras convallis tellus et elit aliquet, vitae dignissim ligula sodales."
      />
      <CardsCta resource={process.env.REACT_APP_INTERNSHIP_OFFER} />
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
      <CTA
        headline="Votre futur stagiare se trouve ici."
        subtitle="Pellentesque vehicula fermentum turpis eu cursus. Cras convallis tellus et elit aliquet, vitae dignissim ligula sodales."
      />
      <CardsCta resource={process.env.REACT_APP_STUDENTS} />
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
      <CTA
        headline="Facile à utiliser!"
        subtitle="Pellentesque vehicula fermentum turpis eu cursus. Cras convallis tellus et elit aliquet, vitae dignissim ligula sodales."
      >
        <Row className="my-5">
          <Col md={{ span: 6, offset: 3 }} sm={12} className="text-center">
            <Image
              fluid
              src={usageImage}
              loading="lazy"
              decoding="async"
              alt="Utilisation"
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <SquareButton to="/inscription" className="p-3 px-5">
              Inscrivez-vous maintenant
            </SquareButton>
          </Col>
        </Row>
      </CTA>
    </main>
  );
};
