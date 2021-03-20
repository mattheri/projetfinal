import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Message } from "../../../../react-app-env";
import { MessageUI } from "../messageUI/MessageUI";
import { useAuth } from "../../../../hooks/useAuth";

type MessageHubProps = {
  messages: Message[];
};

export const MessageHub = ({ messages }: MessageHubProps) => {
  const { currentUser } = useAuth();
  return (
    <Container>
      {messages.map((message) => {
        return (
          <Row key={message._id} className="my-2">
            <MessageUI
              date={message.date}
              id={message._id}
              text={message.message}
              type={currentUser?._id === message.input ? "outbound" : "inbound"}
            />
          </Row>
        );
      })}
    </Container>
  );
};
