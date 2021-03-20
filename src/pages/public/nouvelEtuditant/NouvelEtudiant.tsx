import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { newstudent } from "../../../forms/newstudent/newstudent";
import { useAuth } from "../../../hooks/useAuth";
import { Formation, IForm, Student, User } from "../../../react-app-env";
import { newUserSignupState } from "../../../state/newUserSignupState";

type CheckboxValue = {
  [key: string]: boolean;
};

type NewStudentForm = CheckboxValue & {
  newstudentFirstname: string;
  newstudentLastname: string;
  newstudentCV: string;
};

export const NouvelEtudiant = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [newUserState, setNewUserState] = useRecoilState(newUserSignupState);
  const [newStudentForm, setNewStudentForm] = React.useState(newstudent);

  const handleSubmit = async (values: NewStudentForm) => {
    try {
      // Formik adds checkboxes as Formation Name: true
      // Therefore, add the key to the array only if it's true and it's not a string
      const formations = Object.entries(values)
        .map(([key, value]) => typeof value !== "string" && value && key)
        .filter(Boolean);

      // Build the new student object
      const newStudent: Omit<Student, "_id"> = {
        cv: values.newstudentCV || "",
        prenom: values.newstudentFirstname,
        nom: values.newstudentLastname,
        formations: formations as string[],
        adresse: newUserState.adresse as string,
        codePostal: newUserState.codePostal as string,
        competences: [],
        telephone: newUserState.telephone as string,
        verifie: false,
        ville: newUserState.ville as string,
      };

      // Send the new student object to the API and wait for the response
      const studentResponse: Student = await (
        await axios.post(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_STUDENTS}`,
          newStudent
        )
      ).data;

      // Once we have it, add the missing fields to the user object
      // Since the first connection has been done, the user won't have to
      // re-do everything.
      const user: Partial<User> = {
        entiteId: studentResponse._id,
        premiereConnexion: false,
        type: "etudiant",
      };
      // Send in the completed user to the API
      const userResponse: User = await (
        await axios.put(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_USERS}/${currentUser?._id}`,
          user
        )
      ).data;
      // Then navigate it to the stages section
      navigate("/stages");
    } catch (err) {
      console.warn(err);
    }
  };

  const getFormations = async () => {
    const response: Formation[] = await (
      await axios.get(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_FORMATION}`
      )
    ).data;
    let row = 3;
    const formations = response.map((formation, index) => {
      // For each formation retrieved, create a form object
      const formationCheckBox: IForm = {
        id: formation.nom,
        // Increment row value by one each 3 input
        // Since we add one input at the beginning
        // Needs to account for this
        row: index % 3 !== 2 || index === 0 ? row : row++,
        type: "checkbox",
        label: formation.nom,
        span: {
          sm: 12,
        },
      };
      return formationCheckBox;
    });

    setNewStudentForm((state) => state.concat(formations));
  };

  React.useEffect(() => {
    const length = newstudent.length;
    // Make sure that we do not invoke this
    // funciton over and over if the form gets
    // re-rendered.
    if (newStudentForm.length === length) {
      // Then get all the formations and concat them into the state
      getFormations();
    }
  }, []);

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
          />
        </Container>
      </Container>
    </main>
  );
};
