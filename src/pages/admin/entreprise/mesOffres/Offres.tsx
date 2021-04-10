import { OffreStage } from "react-app-env";
import Col from "react-bootstrap/Col";
import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import Button from "react-bootstrap/Button";

type OffresProps = {
  data: OffreStage[];
  handleOpenSideMenuWithData: (offre: OffreStage) => void;
};

export const Offres = ({ data, handleOpenSideMenuWithData }: OffresProps) => {
  return (
    <>
      {data.map((offre) => (
        <Col xs={12} md={6} lg={4} className="py-3">
          <SmallCard
            title={offre.titre}
            subtitle={offre.competences.join(" ")}
            body={offre.description}
            footer={
              <Button
                onClick={() => handleOpenSideMenuWithData(offre)}
                block
                variant="info"
              >
                Voir plus &amp; modifier
              </Button>
            }
          />
        </Col>
      ))}
    </>
  );
};
