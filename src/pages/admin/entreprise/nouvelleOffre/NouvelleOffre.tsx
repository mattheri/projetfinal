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
  const [length, setLength] = React.useState(0);
  const { currentUser } = useAuth();
  let row = 10;
  const navigate = useNavigate();

  const handleSubmitSuccess = () => navigate("/admin/mesoffres");
  const handleSubmit = onSubmit(currentUser?._id, handleSubmitSuccess);
  const handleConcatToFormAsync = async (values: () => Promise<IForm[]>) => {
    const sectors = await values();
    setForm((form) => form.concat(sectors));
  };

  React.useLayoutEffect(() => {
    if (!form.some((inputObj) => inputObj.id === "NodeJS")) {
      handleConcatToFormAsync(getFormations(row));
      setLength(form.length);
    }
  }, []);

  React.useLayoutEffect(() => {
    if (!form.some((inputObj) => inputObj.id === "SaaS") && length) {
      handleConcatToFormAsync(getActivites(length));
    }
  }, [length]);

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
          child={[
            {
              row: row,
              children: (
                <Col xs={12}>
                  <h4 className="my-3">Formations requises</h4>
                </Col>
              ),
            },
            {
              row: form.length,
              children: (
                <Col xs={12}>
                  <h4 className="my-3">Secteur d'activités</h4>
                </Col>
              ),
            },
          ]}
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
