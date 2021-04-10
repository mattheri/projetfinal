/* eslint-disable */
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import { Error } from "components/ui/Common/error/Error";
import { Formulaire } from "components/ui/Common/form/Form";
import { Loading } from "components/ui/Common/loading/Loading";
import { SideMenu } from "components/ui/Common/sidemenu/SideMenu";
import { newstage } from "forms/newStage/newStage";
import { useAuth } from "hooks/useAuth";
import { useClickOutside } from "hooks/useClickOutside";
import { IForm, OffreStage } from "react-app-env";
import { queryFn } from "utils/queryFn";
import { handleSubmit } from "./handleSubmit";
import { getActivities } from "./getActivites";
import { getCompetences } from "./getCompetences";
import { getFormations } from "./getFormations";
import { formatDate } from "./formatDate";

const queryKey = uuidv4();

export const MesOffres = () => {
  const [selected, setSelected] = React.useState<OffreStage>();
  const [show, setShow] = React.useState(false);
  const [form, setForm] = React.useState(newstage);
  const [modal, setModal] = React.useState(false);

  const { currentUser } = useAuth();
  const query = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/stage/entreprise/${currentUser?.entiteId}`
  );

  const { data, isLoading, isError, refetch } = useQuery(queryKey, query);

  /**
   * Sets the selected state and open the menu.
   * The menu pulls the data from the selected state.
   */
  const handleOpenSideMenuWithData = (offre: OffreStage) => {
    setSelected(offre);
    setShow(true);
  };

  /**
   * Close the menu
   */
  const handleClose = () => setShow(false);

  /**
   * Function to handle the submit success
   */
  const handleOnSuccess = () => {
    handleClose();
    setForm(newstage);
  };

  /**
   * Adds the form object to the form state
   * @param values Promise that returns a form object
   */
  const handleConcatToForm = async (values: () => Promise<IForm[]>) => {
    const val = await values();
    setForm((form) => form.concat(val));
  };

  /**
   * Sidemenu ref
   */
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, handleClose);

  /**
   * Memoize the id.
   * Otherwise, the form gets re-fetched at each user input
   */
  const _id = React.useMemo(() => selected?._id, [selected?._id]);

  /**
   * Memoize the selected.
   * Otherwise, the form gets re-fetched at each user input
   */
  const _selected = React.useMemo(() => selected, [selected]);

  /**
   * If the selected changed and if it is not undefined,
   * creates a new array of form objects from the competences in
   * the selected state, if any, then adds them to the form
   */
  React.useEffect(() => {
    if (selected) {
      const competences = getCompetences(selected, form);
      handleConcatToForm(competences);
      console.log(selected);
    }
  }, [_selected]);

  /**
   * When the state selected is set
   * If the _id changes, set the form to the form objects array
   * Then get the sector activites and add them to the form
   */
  React.useEffect(() => {
    setForm(newstage);
    handleConcatToForm(getActivities);
    handleConcatToForm(getFormations);
  }, [_id]);

  const onSubmit = handleSubmit(selected, currentUser?._id, handleOnSuccess);
  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const handleAskBeforeDelete = () => handleShowModal();
  const handleDelete = async () => {
    const response = await queryFn(
      "delete",
      `https://lit-shelf-44437.herokuapp.com/api/stage/${selected?._id}`
    )();

    if (response._id === selected?._id) {
      handleCloseModal();
      refetch();
    }
  };

  return (
    <main className="position-relative">
      <Container>
        {isLoading && <Loading />}
        {isError && <Error />}
        <Row>
          {data &&
            data.length > 0 &&
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
          onSubmit={onSubmit}
          submitButtonValue="Modifier"
          initialValues={
            _selected &&
            Object.fromEntries([
              ...newstage.map((input) => [
                input.id,
                formatDate(input.id, _selected[input.id]),
              ]),
              ["id", _selected._id],
              ..._selected.secteurActivite.map((secteur, index) => [
                "secteur" + secteur,
                true,
              ]),
              ..._selected.competences.map((competence, index) => [
                `competence${form.length + index}`,
                competence,
              ]),
              ..._selected.formationRequise.map((formation, index) => [
                "formation" + formation,
                true,
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
