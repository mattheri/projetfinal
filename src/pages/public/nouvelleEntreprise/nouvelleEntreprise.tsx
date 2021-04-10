/* eslint-disable */
import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Formulaire } from "components/ui/Common/form/Form";
import { newenterprise } from "forms/newEnterprise/newEnterprise";
import { useAuth } from "hooks/useAuth";
import { IForm, User, Enterprise, SecteurActivite } from "react-app-env";
import { newUserSignupState } from "state/newUserSignupState";

type CheckboxValue = {
  [key: string]: boolean;
};

type NewEnterpriseForm = CheckboxValue & {
  newenterpriseName: string;
  newenterpriseContactFirstname: string;
  newenterpriseContactLastname: string;
  newenterpriseContactEmail: string;
  newenterpriseWebsite: string;
  newenterpriseLogo: string;
  newenterpriseDescription: string;
};

export const NouvelleEntreprise = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const newUserState = useRecoilValue(newUserSignupState);
  const [newEnterpriseForm, setNewEnterpriseForm] = React.useState(
    newenterprise
  );

  const handleSubmit = async (values: NewEnterpriseForm) => {
    try {
      // Formik adds checkboxes as Formation Name: true
      // Therefore, add the key to the array only if it's true and it's not a string
      const secteurs = Object.entries(values)
        .map(([key, value]) => typeof value !== "string" && value && key)
        .filter(Boolean);

      // Build the new enterprise object
      const enterprise: Omit<Enterprise, "_id"> = {
        adresse: newUserState.adresse as string,
        codePostal: newUserState.codePostal as string,
        courrielPersonneContact: values.newenterpriseContactEmail,
        description: values.newenterpriseDescription || "",
        logo: values.newenterpriseLogo || "",
        nom: values.newenterpriseName,
        nomPersonneContact: values.newenterpriseContactLastname,
        prenomPersonneContact: values.newenterpriseContactFirstname,
        secteurActivite: secteurs as string[],
        siteWeb: values.newenterpriseWebsite || "",
        telephone: newUserState.telephone as string,
        ville: newUserState.ville as string,
      };

      // Send the new enterprise object to the API and wait for the response
      const enterpriseResponse: Enterprise = await (
        await axios.post(
          `https://lit-shelf-44437.herokuapp.com/api/entreprise`,
          enterprise
        )
      ).data;

      // Once we have it, add the missing fields to the user object
      // Since the first connection has been done, the user won't have to
      // re-do everything.
      const user: Partial<User> = {
        entiteId: enterpriseResponse._id,
        premiereConnexion: false,
        type: "entreprise",
      };
      // Send in the completed user to the API
      await (
        await axios.put(
          `https://lit-shelf-44437.herokuapp.com/api/utilisateur/${currentUser?._id}`,
          user
        )
      ).data;
      // Then navigate it to the stagiaires section
      navigate("/stagiaires");
    } catch (err) {
      console.warn(err);
    }
  };

  const getSecteurs = async () => {
    const response: SecteurActivite[] = await (
      await axios.get(`https://lit-shelf-44437.herokuapp.com/api/activite`)
    ).data;
    let row = 5;
    const secteurs = response.map((sector, index) => {
      // For each sector retrieved, create a form object
      const sectorCheckBox: IForm = {
        id: sector.nom,
        // Increment row value by one each 3 input
        // Since we add one input at the beginning
        // Needs to account for this
        row: index % 3 !== 2 || index === 0 ? row : row++,
        type: "checkbox",
        label: sector.nom,
        span: {
          sm: 12,
          md: 4,
        },
      };
      return sectorCheckBox;
    });

    setNewEnterpriseForm((state) => state.concat(secteurs));
  };

  React.useEffect(() => {
    const length = newenterprise.length;
    // Make sure that we do not invoke this
    // funciton over and over if the form gets
    // re-rendered.
    if (newEnterpriseForm.length === length) {
      // Then get all the activity sectors and concat them into the state
      getSecteurs();
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
            formInputs={newEnterpriseForm}
            onSubmit={handleSubmit}
            submitButtonValue="Compléter"
          />
        </Container>
      </Container>
    </main>
  );
};
