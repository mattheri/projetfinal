import React from "react";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";
import { SmallText } from "../../smalltext/SmallText";
import classnames from "classnames";
import "./SmallCard.scss";

export type CardProps = {
  title: string;
  subtitle?: string;
  body: string | JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
};

export const SmallCard = ({
  title,
  subtitle,
  body,
  footer,
  onClick,
}: CardProps) => {
  return (
    <Card
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -15, opacity: 0 }}
      exit={{ y: -15, opacity: 0 }}
      className={classnames("small-card", { ["clickable"]: onClick })}
      as={motion.article}
      onClick={onClick}
    >
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle as={SmallText} margins={false} condensed>
        {subtitle}
      </Card.Subtitle>
      <Card.Body>{body}</Card.Body>
      <Card.Footer>{footer}</Card.Footer>
    </Card>
  );
};
