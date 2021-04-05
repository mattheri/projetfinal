import { Formulaire } from "components/ui/Common/form/Form";
import { FormFieldAdder } from "components/ui/Common/formFieldAdder/FormFieldAdder";
import { Loading } from "components/ui/Common/loading/Loading";
import { newstudent } from "forms/etudiantProfile/etudiantProfile";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { IForm, Student } from "react-app-env";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";
import { queryFn } from "utils/queryFn";
import { v4 as uuidv4 } from "uuid";
import { getCompetences } from "./getCompetences";
import { getFormations } from "./getFormations";
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

  const handleSuccessSubmit = () => {
    refetch();
  };
  const handleSubmit = onSubmit(
    handleSuccessSubmit,
    currentUser?.entiteId,
    currentUser?._id
  );
  const handleInitialValues = () => {
    const userData = { ...data, courriel: currentUser?.courriel };
    return Object.fromEntries([
      ...newstudent.map((input) => [input.id, userData[input.id]]),
      ...(data as Student).formations.map((formation) => [
        "formation" + formation,
        true,
      ]),
      ...(data as Student).competences.map((competence, index) => [
        `competence${form.length + index}`,
        competence,
      ]),
    ]);
  };

  const handleConcatToFormAsync = async (values: () => Promise<IForm[]>) => {
    const formInputs = await values();
    setForm((form) => form.concat(formInputs));
  };

  React.useEffect(() => {
    if (data) {
      const competences = getCompetences(data as Student, form);
      handleConcatToFormAsync(competences);
    }
    handleConcatToFormAsync(getFormations);
  }, [data]);

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
