import React from "react";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import classnames from "classnames";
import { SmallText } from "../smalltext/SmallText";
import "./Message.scss";

type MessageProps = {
  type: "inbound" | "outbound";
  id: string;
  text: string;
  date: Date;
};

export const MessageUI = ({ type, id, text, date }: MessageProps) => {
  const msgDate = new Date(date);
  return (
    <Col
      sm={{ span: 6, offset: type === "inbound" ? 0 : 6 }}
      as={motion.article}
      layout
      initial={{ x: type === "outbound" ? 10 : -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={classnames("message", { ["outbound"]: type === "outbound" })}
    >
      <SmallText condensed type="text">
        {msgDate.toLocaleDateString()}
      </SmallText>
      <SmallText margins={false} type="text">
        {text}
      </SmallText>
    </Col>
  );
};
