import Container from "react-bootstrap/Container";
import "./Loading.scss";

export const Loading = () => {
  return (
    <Container className="my-5" fluid>
      <div className="wrapper">
        <div className="blue ball"></div>
        <div className="red ball"></div>
        <div className="yellow ball"></div>
        <div className="green ball"></div>
      </div>
    </Container>
  );
};
