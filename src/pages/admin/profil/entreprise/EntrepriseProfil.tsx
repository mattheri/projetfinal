/* eslint-disable */
import { Formulaire } from "components/ui/Common/form/Form";
import { Loader } from "components/ui/Common/loader/Loader";
import { entrepriseProfile } from "forms/entrepriseProfile/entrepriseProfile";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { Enterprise, IForm } from "react-app-env";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";
import { queryFn } from "utils/queryFn";
import { v4 as uuidv4 } from "uuid";
import { getActivities } from "./getActivities";
import { onSubmit } from "./onSubmit";

const queryKey = uuidv4();

export const EntrepriseProfile = () => {
  const [form, setForm] = React.useState(entrepriseProfile);
  const { currentUser } = useAuth();
  const query = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/entreprise/${currentUser?.entiteId}`
  );
  const { data, refetch, status } = useQuery(queryKey, query);

  const handleSuccessSubmit = () => {
    refetch();
  };
  const handleSubmit = onSubmit(handleSuccessSubmit, currentUser?.entiteId);
  const handleInitialValues = () => {
    return Object.fromEntries([
      ...entrepriseProfile.map((input) => [input.id, data[input.id]]),
      ...(data as Enterprise).secteurActivite.map((secteur) => [
        "secteur" + secteur,
        true,
      ]),
    ]);
  };

  const handleConcatToFormAsync = async (values: () => Promise<IForm[]>) => {
    const sectors = await values();
    setForm((form) => form.concat(sectors));
  };

  React.useEffect(() => {
    if (!form.some((inputObj) => inputObj.id === "SaaS")) {
      handleConcatToFormAsync(getActivities());
    }
  }, []);

  return (
    <main>
      <Container className="py-5">
        <Loader
          component={
            <Formulaire
              formInputs={form}
              onSubmit={handleSubmit}
              initialValues={handleInitialValues()}
              submitButtonValue="Modifier"
            />
          }
          status={status}
        />
      </Container>
    </main>
  );
};
