import React from "react";
import { OffreStage } from "react-app-env";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useRequestInternship } from "./useRequestInternship";
import { usePreviousApplication } from "./usePreviousApplication";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SmallText } from "components/ui/Common/smalltext/SmallText";
import Table from "react-bootstrap/Table";
import { DateTime } from "luxon";
import { useModalMessages } from "hooks/useModalMessages";

type StageProps = {
  stage: OffreStage | undefined;
};

export const StageComponent = ({ stage }: StageProps) => {
  const [applicationStatus, setApplicationStatus] = React.useState(false);
  const { hasApplied, refetch } = usePreviousApplication(stage?._id);
  const query = useRequestInternship(stage?._id);
  const buttonText: { [key: string]: string } = {
    true: "Demande envoyée",
    false: "Postuler maintenant",
  };
  const yesNo: { [key: string]: string } = {
    true: "Oui",
    false: "Non",
  };
  const { Modal, handleShow } = useModalMessages();
  const showIfEmptyOrContent = (arr: string[] | undefined) => {
    if (arr?.length) {
      return arr.join(" ");
    }

    return "Aucune";
  };
  const handleSendInternshipRequest = () => {
    query();
    refetch();
    setApplicationStatus(true);
  };

  return (
    <>
      <Jumbotron>
        <h1>{stage?.titre}</h1>
        <h3 className="mb-3">
          {stage?.entreprise} - {stage?.ville}
        </h3>
        <Table borderless responsive>
          <thead>
            <tr>
              <th className="px-0">Date de parution</th>
              <th>Rémunéré</th>
              <th>Salaire</th>
              <th>Possibilité d'emploi après le stage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-0">
                {DateTime.fromJSDate(
                  new Date((stage?.dateParution as unknown) as string)
                ).toLocaleString()}
              </td>
              <td>{yesNo[`${stage?.remunere}`]}</td>
              <td>{stage?.salaire}$/heure</td>
              <td>{yesNo[`${stage?.emploiApresStage}`]}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          onClick={handleSendInternshipRequest}
          disabled={applicationStatus || hasApplied}
        >
          {buttonText[`${applicationStatus || hasApplied}`]}
        </Button>{" "}
        <Button
          onClick={() => handleShow({ to: stage?._id, name: stage?.titre })}
        >
          Contacter
        </Button>
      </Jumbotron>
      <Row>
        <Col>
          <SmallText>
            <strong>Formation requise ou en cours:</strong>{" "}
            {showIfEmptyOrContent(stage?.formationRequise)}
          </SmallText>
        </Col>
      </Row>
      <Row>
        <Col>
          <SmallText>
            <strong>Compétences additionelles souhaitées:</strong>{" "}
            {showIfEmptyOrContent(stage?.competences)}
          </SmallText>
        </Col>
      </Row>
      <Row>
        <Col>
          <SmallText>{stage?.description}</SmallText>
        </Col>
      </Row>
      <Row>
        <Table borderless responsive>
          <thead>
            <tr>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Durée</th>
              <th>Nb. Heures par semaine</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {DateTime.fromJSDate(
                  new Date((stage?.dateDebut as unknown) as string)
                ).toLocaleString()}
              </td>
              <td>
                {DateTime.fromJSDate(
                  new Date((stage?.dateFin as unknown) as string)
                ).toLocaleString()}
              </td>
              <td>{stage?.duree} semaines</td>
              <td>{stage?.nbHeuresSemaine}h/semaine</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <SmallText>{stage?.informationsSupplementaires}</SmallText>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="mt-3"
            block
            onClick={handleSendInternshipRequest}
            disabled={applicationStatus || hasApplied}
          >
            {buttonText[`${applicationStatus || hasApplied}`]}
          </Button>
        </Col>
      </Row>
      {Modal}
    </>
  );
};
