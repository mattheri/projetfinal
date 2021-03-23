import React from "react";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { newstage } from "../../../forms/newStage/newStage";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { IForm, SecteurActivite } from "../../../react-app-env";
import { useAuth } from "../../../hooks/useAuth";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const NouvelleOffre = () => {
  const [form, setForm] = React.useState(newstage);
  const { currentUser } = useAuth();
  let row = 8;
  const navigate = useNavigate();
  const handleSubmit = async (values: { [key: string]: string }) => {
    const secteurs = Object.entries(values)
      .map(([key, value]) => typeof value !== "string" && value && key)
      .filter(Boolean);
    const competences = Object.entries(values)
      .map(([key, value]) => {
        if (key.includes("competence")) {
          return value;
        }
      })
      .filter(Boolean);

    try {
      const body = {
        titre: values.titre,
        entreprise: values.entreprise,
        secteurActivite: secteurs,
        ville: values.ville,
        dateDebut: new Date(values.dateDebut),
        dateFin: new Date(values.dateFin),
        description: values.description,
        nbHeuresSemaine: values.nbHeuresSemaine,
        remunere: values.remunere,
        emploiApresStage: values.emploiApresStage,
        dateParution: Date.now(),
        informationsSupplementaires: values.informationsSupplementaires,
        actif: true,
        verifie: true,
        entityId: currentUser?._id,
        competences: competences,
        salaire: values.salaire,
        duree: values.duree,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}`,
        body
      );
      if (response.status === 200) {
        navigate("/mesoffres");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getActivitySectorsAndAddToForm = async () => {
    if (!form.some((input) => input.id === "SaaS")) {
      const sectors: SecteurActivite[] = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_ACTIVITY}`
        )
      ).data;
      const sectorsFormInput = sectors.map((sector, index) => {
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
      setForm((form) => form.concat(sectorsFormInput));
    }
  };

  React.useEffect(() => {
    getActivitySectorsAndAddToForm();
  }, []);

  const addCompetence = () => {
    const competence = {
      id: `competence${form.length}`,
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
    setForm((form) => form.concat([competence]));
  };

  return (
    <main>
      <Container className="my-5">
        <Formulaire
          formInputs={form}
          onSubmit={handleSubmit}
          child={{
            row: 10,
            children: (
              <Col xs={12}>
                <h4 className="my-3">Formations requises</h4>
              </Col>
            ),
          }}
          submitButtonValue="Créer l'offre"
        >
          <Col xs={12} className="py-3">
            <Button onClick={addCompetence}>Ajouter une compétence</Button>
          </Col>
        </Formulaire>
      </Container>
    </main>
  );
};
