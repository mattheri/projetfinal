import { motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
    <Card
      as={motion.div}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="long-card mb-3"
    >
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
      </Row>
    </Card>
  );
};
