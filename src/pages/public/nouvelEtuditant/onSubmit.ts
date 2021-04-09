import { Student, User } from "react-app-env";
import axios from "axios";

export const onSubmit = (
  newUserState: Partial<Student>,
  onSuccess: () => void,
  id: string,
  onSignIn: (user: User) => void
) => {
  return async (values: { [key: string]: any }) => {
    try {
      // Formik adds checkboxes as Formation Name: true
      // Therefore, add the key to the array only if it's true and it's not a string
      const formations = Object.entries(values)
        .map(([key, value]) => {
          if (key.includes("formation") && value === true) {
            return key.replace("formation", "");
          }
        })
        .filter(Boolean);
      const competences = Object.entries(values)
        .map(([key, value]) => {
          if (key.includes("competence") && value) {
            return (value as unknown) as string;
          }
        })
        .filter(Boolean);

      // Build the new student object
      const newStudent: Omit<Student, "_id"> = {
        cv: values.cv || "",
        prenom: values.prenom,
        nom: values.nom,
        formations: formations as string[],
        adresse: newUserState.adresse as string,
        codePostal: newUserState.codePostal as string,
        competences: competences as string[],
        telephone: newUserState.telephone as string,
        verifie: false,
        ville: newUserState.ville as string,
        about: values.about,
        startDate: values.startDate,
        duree: values.duree,
        degreeEndDate: values.degreeEndDate,
      };

      // Send the new student object to the API and wait for the response
      const studentResponse: () => Promise<Student> = async () => {
        return (
          await axios.post(
            `${process.env.REACT_APP_API}${process.env.REACT_APP_STUDENTS}`,
            newStudent
          )
        ).data;
      };

      if (await (await studentResponse())._id) {
        // Once we have it, add the missing fields to the user object
        // Since the first connection has been done, the user won't have to
        // re-do everything.
        const user: Partial<User> = {
          entiteId: await (await studentResponse())._id,
          premiereConnexion: false,
          type: "etudiant",
        };
        // Send in the completed user to the API
        const userResponse = await axios.put(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_USERS}/${id}`,
          user
        );

        // Then navigate it to the stages section
        if (userResponse.status === 200) {
          onSuccess();
          onSignIn(userResponse.data);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
};
