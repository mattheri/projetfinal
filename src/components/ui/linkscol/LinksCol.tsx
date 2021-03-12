import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import _chunk from "lodash/chunk";
import { RouterLink } from "../routerlink/RouterLink";

export const LinksCol = () => {
  const links = _chunk(
    [
      "Design graphique",
      "Designer web",
      "Développeur front-end",
      "Développeur web",
      "Ressources humaines",
      "Marketing web",
      "Développeur mobile",
      "Développeur application mobile",
      "Responsable de produit",
      "Ventes",
      "Design de logo",
      "SEO",
      "Articles",
      "Android",
      "DevOps",
    ],
    4
  );

  return (
    <Row>
      {links.map((col, index) => (
        <Col key={index}>
          <Nav className="flex-column align-items-start">
            {col.map((link) => (
              <Nav.Item
                variant="link"
                to={`${encodeURIComponent(link)}`}
                as={RouterLink}
              >
                {link}
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      ))}
    </Row>
  );
};
