import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Logo } from "../ui/Common/logo/Logo";
import { RouterLink } from "../ui/Common/routerlink/RouterLink";
import { useRecoilValue } from "recoil";
import { appState } from "state/app";
import { useAuth } from "hooks/useAuth";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import classnames from "classnames";
import "./Navigation.scss";

/**
 * Primary navbar. Shows different buttons based on context.
 *
 * If there is no user, can see both students and offers.
 * If user is student, can only see offers. Can also go to his profile.
 * If enterprise, can only see students. Can also go to his profile.
 *
 * In admin area, also shows different buttons.
 * If user, can only change its profile.
 * If enterprise, can change its profile, add offers and manage them.
 */
export const Navigation = () => {
  /**
   * Get the current app state from the state. Will be used to know if the user is connected
   * and what type of user it is.
   */
  const currentAppState = useRecoilValue(appState);

  /**
   * Will be used to signout the user when the user clicks on sign out button.
   */
  const { onSignOut } = useAuth();

  /**
   * Will be used to know if user is currently in admin area or not.
   */
  const location = useLocation();
  return (
    <Navbar
      expand="md"
      className={classnames({
        // Navbar turns dark when you enter admin area.
        // It also takes up the full width.
        ["mx-lg-5"]: !location.pathname.includes("admin"),
        ["bg-dark"]: location.pathname.includes("admin"),
      })}
    >
      <Navbar.Brand className="mr-lg-5">
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Are we in admin area or not? */}
          {location.pathname.includes("admin") ? (
            <>
              {/* If yes, is the user a student or an enterprise? */}
              {currentAppState.user?.type === "etudiant" ? (
                // If student, only show the profile button
                <Nav.Link variant="success" to="" as={RouterLink}>
                  Profil
                </Nav.Link>
              ) : (
                <>
                  {/* If enterprise, show profile, new offer, my offers button */}
                  <Nav.Link variant="success" to="" as={RouterLink}>
                    Profil
                  </Nav.Link>
                  <Nav.Link variant="success" to="new/offre" as={RouterLink}>
                    Créer une offre
                  </Nav.Link>
                  <Nav.Link variant="success" to="mesoffres" as={RouterLink}>
                    Gérer mes offres
                  </Nav.Link>
                </>
              )}
            </>
          ) : (
            <>
              {/* Is the user a student or not? */}
              {currentAppState.connected ? (
                currentAppState.user?.type === "etudiant" ? (
                  // If so, he can only check for internship offers
                  <Nav.Link to="/stages" variant="success" as={RouterLink}>
                    Trouver votre stage
                  </Nav.Link>
                ) : (
                  // Otherwise, it's an enterprise and can only check for students.
                  <Nav.Link to="/stagiaires" variant="success" as={RouterLink}>
                    Trouver votre futur stagiaire
                  </Nav.Link>
                )
              ) : (
                <>
                  <Nav.Link to="/stages" variant="success" as={RouterLink}>
                    Trouver votre stage
                  </Nav.Link>
                  <Nav.Link to="/stagiaires" variant="success" as={RouterLink}>
                    Trouver votre futur stagiaire
                  </Nav.Link>
                </>
              )}
            </>
          )}
        </Nav>
        <Nav>
          {/* Is the user connected? */}
          {currentAppState.connected ? (
            <>
              {currentAppState.connected &&
                // If we are not in the admin area
                !location.pathname.includes("admin") && (
                  // Show the profile button
                  <Nav.Link variant="link" to="admin" as={RouterLink}>
                    👷 Profile
                  </Nav.Link>
                )}
              {/* Show the message button */}
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
              {/* Show the log out button */}
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
