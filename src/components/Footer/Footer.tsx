import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";
import { RouterLink } from "../ui/Common/routerlink/RouterLink";
import { LinksCol } from "../ui/Public/linkscol/LinksCol";
import "./Footer.scss";

export const Footer = () => {
  return (
    <motion.div layout>
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
      <Navbar className="footer-navbar bg-white py-3 flex-column flex-md-row">
        <Nav className="mr-auto align-items-center w-100">
          ©️ {new Date(Date.now()).getFullYear()}{" "}
          <Nav.Item className="px-0" to="/" variant="link" as={RouterLink}>
            EnStage
          </Nav.Item>{" "}
          - Projet éducationnel
        </Nav>
        <Nav className="flex-column flex-md-row w-100 justify-content-md-end">
          <Nav.Item
            className="align-self-start px-0 px-md-3 align-self-md-end"
            to="/"
            variant="link"
            as={RouterLink}
          >
            Accueil
          </Nav.Item>
          <Nav.Item
            className="align-self-start px-0 px-md-3 align-self-md-end"
            to="/about"
            variant="link"
            as={RouterLink}
          >
            À propos
          </Nav.Item>
          <Nav.Item
            className="align-self-start px-0 px-md-3 align-self-md-end"
            to="/confidentiality"
            variant="link"
            as={RouterLink}
          >
            Confidentialité
          </Nav.Item>
          <Nav.Item
            className="align-self-start px-0 px-md-3 align-self-md-end"
            to="/contact-us"
            variant="link"
            as={RouterLink}
          >
            Nous joindre
          </Nav.Item>
          <Nav.Item
            className="align-self-start px-0 px-md-3 align-self-md-end"
            to="/partners"
            variant="link"
            as={RouterLink}
          >
            Partenaires
          </Nav.Item>
        </Nav>
      </Navbar>
    </motion.div>
  );
};
