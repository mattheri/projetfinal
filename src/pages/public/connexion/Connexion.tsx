import Container from "react-bootstrap/Container";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { login } from "../../../forms/login/login";
import axios from "axios";
import { User } from "../../../react-app-env";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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
      const user = await axios.post(
        `https://lit-shelf-44437.herokuapp.com/api/utilisateur/login`,
        { courriel: loginUsername, password: loginPassword }
      );
      if (user.status === 200) {
        const userData: User = user.data;
        onSignIn(userData);
        handleRerouteOnSigin(userData.premiereConnexion);
        toast.success("Connexion réussie!");
      }
    } catch (err) {
      console.warn(err);
      toast.error("Une erreur est survenue.");
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
