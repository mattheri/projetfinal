import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import tumbleweed from "../../../../assets/images/Tumbleweed.gif";
import "./Empty.scss";

export const Empty = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="empty my-5 d-flex justify-content-center">
          <h1>...Rien à voir ici...</h1>
          <img
            src={tumbleweed}
            loading="lazy"
            alt="Tumbleweed"
            decoding="async"
          />
        </Col>
      </Row>
    </Container>
  );
};
