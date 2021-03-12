import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { LinksCol } from "../ui/linkscol/LinksCol";
import Nav from "react-bootstrap/Nav";
import { RouterLink } from "../ui/routerlink/RouterLink";
import "./Footer.scss";

export const Footer = () => {
  return (
    <>
      <Container className="bg-light py-5" fluid as="footer">
        <Container>
          <Row>
            <Col>
              <h3 className="pl-2 pb-3">Ils sont à la recherche d'un stage:</h3>
            </Col>
          </Row>
          <LinksCol />
        </Container>
      </Container>
      <Navbar className="footer-navbar bg-white py-3">
        <Nav className="mr-auto align-items-center">
          ©️ {new Date(Date.now()).getFullYear()}{" "}
          <Nav.Item className="px-0" to="/" variant="link" as={RouterLink}>
            EnStage
          </Nav.Item>{" "}
          - Projet éducationnel
        </Nav>
        <Nav>
          <Nav.Item to="/" variant="link" as={RouterLink}>
            Accueil
          </Nav.Item>
          <Nav.Item to="/about" variant="link" as={RouterLink}>
            À propos
          </Nav.Item>
          <Nav.Item to="/confidentiality" variant="link" as={RouterLink}>
            Confidentialité
          </Nav.Item>
          <Nav.Item to="/contact-us" variant="link" as={RouterLink}>
            Nous joindre
          </Nav.Item>
          <Nav.Item to="/partners" variant="link" as={RouterLink}>
            Partenaires
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};
