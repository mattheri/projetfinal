import { motion } from "framer-motion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth } from "../../../../hooks/useAuth";
import { Message } from "../../../../react-app-env";
import { MessageUI } from "../messageUI/MessageUI";

type MessageHubProps = {
  messages: Message[];
};

export const MessageHub = ({ messages }: MessageHubProps) => {
  const { currentUser } = useAuth();
  return (
    <Container layout as={motion.div}>
      {messages.map((message) => {
        return (
          <Row key={message._id} className="my-2 px-2">
            <MessageUI
              date={message.date}
              id={message._id}
              text={message.message}
              type={
                currentUser?.entiteId === message.from ? "outbound" : "inbound"
              }
            />
          </Row>
        );
      })}
    </Container>
  );
};
