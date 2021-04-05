import { FormFieldAdder } from "components/ui/Common/formFieldAdder/FormFieldAdder";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { Formulaire } from "../../../../components/ui/Common/form/Form";
import { newstage } from "../../../../forms/newStage/newStage";
import { useAuth } from "../../../../hooks/useAuth";
import { IForm } from "../../../../react-app-env";
import { getFormations } from "./getFormations";
import { getActivites } from "./getActivites";
import { onSubmit } from "./onSubmit";

export const NouvelleOffre = () => {
  const [form, setForm] = React.useState(newstage);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmitSuccess = () => navigate("/admin/mesoffres");
  const handleSubmit = onSubmit(currentUser?.entiteId, handleSubmitSuccess);
  const handleConcatToFormAsync = async (values: () => Promise<IForm[]>) => {
    const sectors = await values();
    setForm((form) => form.concat(sectors));
  };

  React.useEffect(() => {
    if (!form.some((inputObj) => inputObj.id === "NodeJS")) {
      (async () => {
        await handleConcatToFormAsync(getFormations(form.length));
        await handleConcatToFormAsync(getActivites(form.length + 12));
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
      <Container className="my-5">
        <Formulaire
          formInputs={form}
          onSubmit={handleSubmit}
          submitButtonValue="Créer l'offre"
        >
          <FormFieldAdder
            formLength={form.length}
            formObj={competence}
            add={handleAddFieldToForm}
            buttonText="Ajouter une compétence"
          />
        </Formulaire>
      </Container>
    </main>
  );
};
