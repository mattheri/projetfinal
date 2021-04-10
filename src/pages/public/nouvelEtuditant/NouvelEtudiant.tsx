/* eslint-disable */
import { Formulaire } from "components/ui/Common/form/Form";
import { FormFieldAdder } from "components/ui/Common/formFieldAdder/FormFieldAdder";
import { newstudent } from "forms/newstudent/newstudent";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { IForm } from "react-app-env";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newUserSignupState } from "state/newUserSignupState";
import { getFormations } from "./getFormations";
import { onSubmit } from "./onSubmit";

export const NouvelEtudiant = () => {
  const navigate = useNavigate();
  const { currentUser, onSignIn } = useAuth();
  const newUserState = useRecoilValue(newUserSignupState);
  const [newStudentForm, setNewStudentForm] = React.useState(newstudent);
  const handleRequestSuccess = () => navigate("/");

  const handleSubmit = onSubmit(
    newUserState,
    handleRequestSuccess,
    currentUser?._id as string,
    onSignIn
  );

  React.useEffect(() => {
    const length = newstudent.length;
    // Make sure that we do not invoke this
    // funciton over and over if the form gets
    // re-rendered.
    if (newStudentForm.length === length) {
      // Then get all the formations and concat them into the state
      (async () => {
        const formFields = await getFormations();
        setNewStudentForm((form) => form.concat(formFields));
      })();
    }
  }, []);

  const competence = {
    id: "competence",
    type: "text",
    label: "Compétence",
    required: false,
    span: {
      sm: 12,
    },
    row: newStudentForm.length,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      return "";
    },
  };

  const handleAddFieldToForm = (newField: IForm) => {
    setNewStudentForm((form) => form.concat(newField));
  };

  return (
    <main>
      <Container fluid>
        <Container className="py-5">
          <Formulaire
            // Pass in the state as form inputs
            // When the state is updated by the getter
            // it will update in the UI
            formInputs={newStudentForm}
            onSubmit={handleSubmit}
            submitButtonValue="Compléter"
          >
            <FormFieldAdder
              add={handleAddFieldToForm}
              formObj={competence}
              formLength={newStudentForm.length}
              buttonText="Ajouter une compétence"
            />
          </Formulaire>
        </Container>
      </Container>
    </main>
  );
};
