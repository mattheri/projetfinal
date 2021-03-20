import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Logo } from "../ui/Common/logo/Logo";
import { RouterLink } from "../ui/Common/routerlink/RouterLink";
import { useRecoilValue } from "recoil";
import { appState } from "../../state/app";
import { useAuth } from "../../hooks/useAuth";
import Button from "react-bootstrap/Button";
import "./Navigation.scss";

export const Navigation = () => {
  const currentAppState = useRecoilValue(appState);
  const { onSignOut } = useAuth();
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
          {currentAppState.connected ? (
            <>
              <Nav.Link to="/messages" variant="primary" as={RouterLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chat-right-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                </svg>{" "}
                Messages
              </Nav.Link>
              <Nav.Link variant="secondary" as={Button} onClick={onSignOut}>
                Déconnexion
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link to="/connexion" variant="light" as={RouterLink}>
                Connexion
              </Nav.Link>
              <Nav.Link to="/inscription" variant="secondary" as={RouterLink}>
                Inscription
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
