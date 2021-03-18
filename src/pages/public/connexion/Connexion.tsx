import Container from "react-bootstrap/Container";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { login } from "../../../forms/login/login";
import axios from "axios";
import { User } from "../../../react-app-env";
import { useAuth } from "../../../hooks/useAuth";

type Credentials = {
  loginUsername: string;
  loginPassword: string;
};

export const Connexion = () => {
  const { onSignIn } = useAuth();

  const handleSubmit = async ({
    loginUsername,
    loginPassword,
  }: Credentials) => {
    try {
      const user: User = await (
        await axios.post(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_USERS}/signin`,
          { courriel: loginUsername, password: loginPassword }
        )
      ).data;
      onSignIn(user);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <Container fluid>
        <Container className="py-5">
          <Formulaire formInputs={login} onSubmit={handleSubmit} />
        </Container>
      </Container>
    </>
  );
};
