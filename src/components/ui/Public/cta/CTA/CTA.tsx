import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SmallText } from "../../../Common/smalltext/SmallText";

type CTAprops = {
  headline: string;
  subtitle?: string;
  children?: JSX.Element | JSX.Element[];
};

export const CTA = ({ headline, subtitle, children }: CTAprops) => {
  return (
    <Container fluid className="cta my-5">
      <Row>
        <Col md={{ span: 4, offset: 4 }} sm={12} className="text-center">
          <h1>{headline}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4 }} sm={12} className="text-center">
          <SmallText>{subtitle}</SmallText>
        </Col>
      </Row>
      {children}
    </Container>
  );
};
