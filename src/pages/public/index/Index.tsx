import { Loading } from "../../../components/ui/loading/Loading";
import Container from "react-bootstrap/Container";
import { CardsCta } from "../../../components/CardsCta/CardsCta";

export const Index = () => {
  return (
    <Container fluid as="main">
      <CardsCta resource="stagiaires" />
    </Container>
  );
};
