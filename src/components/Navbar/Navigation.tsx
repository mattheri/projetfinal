import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Logo } from "../ui/logo/Logo";
import { RouterLink } from "../ui/Common/routerlink/RouterLink";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <Navbar expand="md" className="mx-lg-5">
      <Navbar.Brand className="mr-lg-5">
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/stages" variant="success" as={RouterLink}>
            Trouver votre stage
          </Nav.Link>
          <Nav.Link to="/stagiaires" variant="success" as={RouterLink}>
            Trouver votre futur stagiaire
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link to="/connexion" variant="light" as={RouterLink}>
            Connexion
          </Nav.Link>
          <Nav.Link to="/inscription" variant="secondary" as={RouterLink}>
            Inscription
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
