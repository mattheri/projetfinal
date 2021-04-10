import React from "react";
import { Student, User } from "react-app-env";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SmallText } from "components/ui/Common/smalltext/SmallText";
import { useModalMessages } from "hooks/useModalMessages";
import { List } from "components/ui/Common/list/List";

type StagiaireProps = {
  etudiant: (Student & Pick<User, "courriel">) | undefined;
};

export const StagiaireComponent = ({ etudiant }: StagiaireProps) => {
  const { Modal, handleShow } = useModalMessages();

  return (
    <>
      <Jumbotron>
        <h1>
          {etudiant?.prenom} {etudiant?.nom}
        </h1>
        <h3 className="mb-3">{etudiant?.ville}</h3>
        <List>{etudiant?.formations}</List>
        <Button
          onClick={() =>
            handleShow({
              to: etudiant?._id,
              name: `${etudiant?.prenom} ${etudiant?.nom}`,
            })
          }
        >
          Contacter
        </Button>{" "}
        <Button href={etudiant?.cv} disabled={!!!etudiant?.cv} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-download"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>{" "}
          Télécharger le CV
        </Button>
      </Jumbotron>
      <Row>
        <Col>
          <SmallText>
            <strong>Compétences additionelles:</strong>{" "}
            <List>{etudiant?.competences}</List>
          </SmallText>
        </Col>
      </Row>
      {Modal}
    </>
  );
};
