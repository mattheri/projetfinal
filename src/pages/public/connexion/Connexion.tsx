import Container from "react-bootstrap/Container";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { login } from "../../../forms/login/login";

export const Connexion = () => (
  <>
    <Container fluid>
      <Container className="py-5">
        <Formulaire formInputs={login} />
      </Container>
    </Container>
  </>
);
