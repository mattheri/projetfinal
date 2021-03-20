import Container from "react-bootstrap/Container";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { newuser } from "../../../forms/newuser/newuser";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { newUserSignupState } from "../../../state/newUserSignupState";
import { appState } from "../../../state/app";

type NewUserForm = {
  newuserAddress: string;
  newuserCity: string;
  newuserPostalCode: string;
  newuserPhoneNumber: string;
  newuserType: string;
};

export const NouvelUtilisateur = () => {
  const navigate = useNavigate();
  const [newUserState, setNewUserState] = useRecoilState(newUserSignupState);
  const currentAppState = useRecoilValue(appState);

  const handleSubmit = async ({
    newuserAddress,
    newuserCity,
    newuserPhoneNumber,
    newuserPostalCode,
    newuserType = "etudiant",
  }: NewUserForm) => {
    setNewUserState({
      type: newuserType,
      adresse: newuserAddress,
      telephone: newuserPhoneNumber,
      ville: newuserCity,
      codePostal: newuserPostalCode,
    });
    navigate(newuserType === "etudiant" ? "/new/etudiant" : "/new/entreprise");
  };

  if (!currentAppState.connected) navigate("/connexion");

  return (
    <main>
      <Container fluid>
        <Container className="py-5">
          <Formulaire
            formInputs={newuser}
            onSubmit={handleSubmit}
            submitButtonValue="Continuer"
          />
        </Container>
      </Container>
    </main>
  );
};
