import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { SmallText } from "../../smalltext/SmallText";
import { CardProps } from "../SmallCard/SmallCard";
import "./LongCard.scss";

type LongCardProps = CardProps & {
  sub?: string;
  image?: string;
};

export const LongCard = ({
  title,
  subtitle,
  sub,
  image,
  footer,
  body,
}: LongCardProps) => {
  return (
    <Card className="long-card">
      <Row>
        <Col md={10}>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
          <Card.Subtitle as={SmallText} margins={false} condensed>
            {sub}
          </Card.Subtitle>
          <Card.Body>{body}</Card.Body>
          <Card.Footer>{footer}</Card.Footer>
        </Col>
        <Col>
          <Image src={image} loading="lazy" alt={title} decoding="async" />
        </Col>
      </Row>
    </Card>
  );
};
