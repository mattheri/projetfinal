import { Formulaire } from "components/ui/Common/form/Form";
import { FormFieldAdder } from "components/ui/Common/formFieldAdder/FormFieldAdder";
import { Loading } from "components/ui/Common/loading/Loading";
import { newstudent } from "forms/etudiantProfile/etudiantProfile";
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

export const EtudiantProfile = () => {
  const [form, setForm] = React.useState(newstudent);
  const { currentUser } = useAuth();
  const query = queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_STUDENTS}/${currentUser?.entiteId}`
  );
  const { data, isLoading, isError, refetch, isFetched } = useQuery(
    queryKey,
    query
  );
  console.log(data);

  const handleSuccessSubmit = () => {
    refetch();
  };
  const handleSubmit = onSubmit(handleSuccessSubmit, currentUser?.entiteId);
  const handleInitialValues = () => {
    return Object.fromEntries([
      ...newstudent.map((input) => [input.id, data[input.id]]),
    ]);
  };

  const handleConcatToFormAsync = async (values: () => Promise<IForm[]>) => {
    const formInputs = await values();
    setForm((form) => form.concat(formInputs));
  };

  const competence = {
    id: "competence",
    type: "text",
    label: "Compétence",
    required: false,
    span: {
      sm: 12,
    },
    row: form.length,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      return "";
    },
  };

  const handleAddFieldToForm = (newField: IForm) => {
    setForm((form) => form.concat(newField));
  };

  return (
    <main>
      <Container className="py-5">
        {isLoading && <Loading />}
        {isFetched && (
          <Formulaire
            formInputs={form}
            onSubmit={handleSubmit}
            initialValues={handleInitialValues()}
            submitButtonValue="Modifier"
          >
            <FormFieldAdder
              formLength={form.length}
              formObj={competence}
              add={handleAddFieldToForm}
              buttonText="Ajouter une compétence"
            />
          </Formulaire>
        )}
      </Container>
    </main>
  );
};
