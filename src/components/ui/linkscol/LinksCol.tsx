import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import _chunk from "lodash/chunk";
import { RouterLink } from "../routerlink/RouterLink";
import { useLocation } from "react-router-dom";

export const LinksCol = () => {
  const links = _chunk(
    [
      { to: "stagiaires?design-graphique", text: "Design graphique" },
      { to: "stagiaires?design-web", text: "Designer web" },
      { to: "stagiaires?developpeur-front-end", text: "Développeur front-end" },
      { to: "stagiaires?developpeur-web", text: "Développeur web" },
      { to: "stagiaires?ressources-humaines", text: "Ressources humaines" },
      { to: "stagiaires?marketing-web", text: "Marketing web" },
      { to: "stagiaires?developpeur-mobile", text: "Developpeur mobile" },
      {
        to: "stagiaires?developpeur-application-mobile",
        text: "Developpeur application mobile",
      },
      { to: "stagiaires?responsable-produit", text: "Responsable de produit" },
      { to: "stagiaires?ventes", text: "Ventes" },
      { to: "stagiaires?design-logo", text: "Design de logo" },
      { to: "stagiaires?seo", text: "SEO" },
      { to: "stagiaires?articles", text: "Articles" },
      { to: "stagiaires?android", text: "Android" },
      { to: "stagiaires?devops", text: "Devops" },
    ],
    4
  );

  const location = useLocation();

  return (
    <Row>
      {links.map((col, index) => (
        <Col key={index}>
          <Nav className="flex-column align-items-start">
            {col.map((link) => (
              <Nav.Item
                variant="link"
                active={location.search === link.to.replace("stagiaires", "")}
                to={link.to}
                as={RouterLink}
              >
                {link.text}
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      ))}
    </Row>
  );
};
