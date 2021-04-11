import Container from "react-bootstrap/Container";
import { Formulaire } from "components/ui/Common/form/Form";
import { signup } from "forms/signup/signup";
import axios from "axios";
import { User } from "react-app-env";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

type Credentials = {
  signupUsername: string;
  signupPassword: string;
};

export const Inscription = () => {
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
      const user = await axios.post(
        `https://lit-shelf-44437.herokuapp.com/api/utilisateur/signup`,
        body
      );
      if (user.status === 200) {
        const userData: User = user.data;
        onSignIn(userData);
        handleRerouteOnSignup(userData.premiereConnexion);
        toast("Profil complété avec succès!");
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
            formInputs={signup}
            onSubmit={handleSubmit}
            submitButtonValue="S'inscrire"
          />
        </Container>
      </Container>
    </>
  );
};
