import Container from "react-bootstrap/Container";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { signup } from "../../../forms/signup/signup";
import axios from "axios";
import { User } from "../../../react-app-env";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Credentials = {
  signupUsername: string;
  signupPassword: string;
};

export const NouvelUtilisateur = () => {
  const { onSignIn } = useAuth();

  const navigate = useNavigate();
  const handleRerouteOnSignup = (isFirstConnect: boolean) => {
    if (!isFirstConnect) {
      return navigate("/");
    }

    return navigate("/newuser");
  };

  const handleSubmit = async ({
    signupUsername,
    signupPassword,
  }: Credentials) => {
    const body = {
      courriel: signupUsername,
      password: signupPassword,
      role: "user",
      actif: true,
      verifie: false,
      premiereConnexion: true,
      entiteId: "",
      type: "",
    };
    try {
      const user: User = await (
        await axios.post(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_USERS}/signup`,
          body
        )
      ).data;
      onSignIn(user);
      handleRerouteOnSignup(user.premiereConnexion);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <Container fluid>
        <Container className="py-5">
          <Formulaire formInputs={signup} onSubmit={handleSubmit} />
        </Container>
      </Container>
    </>
  );
};
