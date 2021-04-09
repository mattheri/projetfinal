import Container from "react-bootstrap/Container";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { login } from "../../../forms/login/login";
import axios from "axios";
import { User } from "../../../react-app-env";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Credentials = {
  loginUsername: string;
  loginPassword: string;
};

export const Connexion = () => {
  const { onSignIn } = useAuth();
  const navigate = useNavigate();
  const handleRerouteOnSigin = (isFirstConnect: boolean) => {
    if (!isFirstConnect) {
      return navigate("/");
    }

    return navigate("/newuser");
  };

  const handleSubmit = async ({
    loginUsername,
    loginPassword,
  }: Credentials) => {
    try {
      const user: User = await (
        await axios.post(
          `https://lit-shelf-44437.herokuapp.com/api/utilisateur/login`,
          { courriel: loginUsername, password: loginPassword }
        )
      ).data;
      console.log(user);
      onSignIn(user);
      handleRerouteOnSigin(user.premiereConnexion);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <Container fluid>
        <Container className="py-5">
          <Formulaire
            formInputs={login}
            onSubmit={handleSubmit}
            submitButtonValue="Connexion"
          />
        </Container>
      </Container>
    </>
  );
};
