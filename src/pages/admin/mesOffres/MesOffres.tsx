import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { SmallCard } from "../../../components/ui/Common/card/SmallCard/SmallCard";
import { Error } from "../../../components/ui/Common/error/Error";
import { Formulaire } from "../../../components/ui/Common/form/Form";
import { Loading } from "../../../components/ui/Common/loading/Loading";
import { SideMenu } from "../../../components/ui/Common/sidemenu/SideMenu";
import { newstage } from "../../../forms/newStage/newStage";
import { useAuth } from "../../../hooks/useAuth";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { IForm, OffreStage, SecteurActivite } from "../../../react-app-env";

const queryKey = uuidv4();

export const MesOffres = () => {
  const [selected, setSelected] = React.useState<OffreStage>();
  const [show, setShow] = React.useState(false);
  const [form, setForm] = React.useState(newstage);
  const [modal, setModal] = React.useState(false);

  const { currentUser } = useAuth();
  const queryFn = async () => {
    try {
      const response = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/entreprise/${currentUser?._id}`
        )
      ).data;
      return response;
    } catch (err) {
      return err;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery(queryKey, queryFn);

  const handleOpenSideMenuWithData = (offre: OffreStage) => {
    setSelected(offre);
    setShow(true);
  };
  const handleClose = () => setShow(false);

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
        dateParution: selected?.dateParution,
        informationsSupplementaires: values.informationsSupplementaires,
        actif: true,
        verifie: true,
        entityId: currentUser?._id,
        competences: competences,
        salaire: values.salaire,
        duree: values.duree,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/${selected?._id}`,
        body
      );
      console.log(response);
      if (response.status === 200) {
        handleClose();
        setForm(newstage);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  const getActivitySectorsAndAddToForm = async () => {
    const sectors: SecteurActivite[] = await (
      await axios.get(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_ACTIVITY}`
      )
    ).data;
    let row = 8;

    const sectorsFormInput = sectors.map((sector, index) => {
      // For each sector retrieved, create a form object
      const sectorCheckBox: IForm = {
        id: `${sector.nom}`,
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
  };

  const _id = React.useMemo(() => selected?._id, [selected?._id]);
  const _selected = React.useMemo(() => selected, [selected]);

  React.useEffect(() => {
    setForm(newstage);
    getActivitySectorsAndAddToForm();
  }, [_id]);

  React.useEffect(() => {
    if (selected) {
      const competences = selected.competences.map((competence, index) => {
        return {
          id: `competence${form.length + index}`,
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
      });
      setForm((form) => form.concat(competences));
    }
  }, [_selected]);

  useClickOutside(ref, handleClose);

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const handleAskBeforeDelete = () => handleShowModal();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_INTERNSHIP_OFFER}/${selected?._id}`
      );
      if (response.status === 200) {
        handleCloseModal();
        refetch();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <main className="position-relative">
      <Container>
        {isLoading && <Loading />}
        {isError && <Error />}
        <Row>
          {data &&
            (data as OffreStage[]).map((offre) => (
              <Col xs={12} md={6} lg={4} className="py-3">
                <SmallCard
                  title={offre.titre}
                  subtitle={offre.competences.join(" ")}
                  body={offre.description}
                  footer={
                    <Button
                      onClick={() => handleOpenSideMenuWithData(offre)}
                      block
                      variant="info"
                    >
                      Voir plus &amp; modifier
                    </Button>
                  }
                />
              </Col>
            ))}
        </Row>
      </Container>
      <SideMenu className="p-3" ref={ref} shade toggle={show}>
        <Formulaire
          formInputs={form}
          onSubmit={handleSubmit}
          submitButtonValue="Modifier"
          initialValues={
            _selected &&
            Object.fromEntries([
              ...newstage.map((input) => [input.id, _selected[input.id]]),
              ["id", _selected._id],
              ..._selected.secteurActivite.map((secteur, index) => [
                secteur,
                true,
              ]),
              ..._selected.competences.map((competence, index) => [
                `competence${form.length + index}`,
                competence,
              ]),
            ])
          }
        />
        <Button block variant="danger" onClick={handleAskBeforeDelete}>
          Supprimer
        </Button>
      </SideMenu>
      <Modal show={modal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`Supprimer ${selected?.titre}?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ceci va supprimer définitivement cette offre de stage.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Continuer
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};
