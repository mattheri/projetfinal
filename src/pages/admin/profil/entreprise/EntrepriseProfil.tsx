import { Formulaire } from "components/ui/Common/form/Form";
import { Loading } from "components/ui/Common/loading/Loading";
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
    `${process.env.REACT_APP_API}${process.env.REACT_APP_ENTERPRISES}/${currentUser?.entiteId}`
  );
  const { data, isLoading, isError, refetch } = useQuery(queryKey, query);

  const handleSuccessSubmit = () => {
    refetch();
    setInitialValues(handleInitialValues());
  };
  const handleSubmit = onSubmit(handleSuccessSubmit, currentUser?.entiteId);
  const handleInitialValues = () => {
    if (data) {
      return Object.fromEntries([
        ...entrepriseProfile.map((input) => [input.id, data[input.id]]),
        ...(data as Enterprise).secteurActivite.map((secteur) => [
          "secteur" + secteur,
          true,
        ]),
      ]);
    }
  };
  const [initialValues, setInitialValues] = React.useState(
    handleInitialValues()
  );

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
        {isLoading && <Loading />}
        <Formulaire
          formInputs={form}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          submitButtonValue="Modifier"
        />
      </Container>
    </main>
  );
};
