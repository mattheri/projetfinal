import React from "react";
import { entrepriseProfile } from "forms/entrepriseProfile/entrepriseProfile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formulaire } from "components/ui/Common/form/Form";
import { useQuery } from "react-query";
import axios from "axios";
import { queryFn } from "utils/queryFn";

export const EtudiantProfile = () => {
  const handleSubmit = () => {};
  return (
    <main>
      <Container>
        <Formulaire formInputs={entrepriseProfile} onSubmit={handleSubmit} />
      </Container>
    </main>
  );
};
