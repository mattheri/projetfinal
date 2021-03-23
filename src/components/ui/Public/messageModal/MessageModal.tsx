import React from "react";
import { ModalProps } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formulaire } from "../../Common/form/Form";
import { message } from "../../../../forms/message/message";
import axios from "axios";
import { Message } from "../../../../react-app-env";
import { useQuery } from "react-query";
import _chunk from "lodash/chunk";
import { Loading } from "../../Common/loading/Loading";
import { MessageHub } from "../../Common/messagehub/MessageHub";

export type MessageModalProps = ModalProps & {
  contacter: string | undefined;
  contactee: string;
  name: string;
};

type MessageProps = {
  message: string;
};

type MessageObject = Omit<Message, "_id" | "date">;

export const MessageModal = ({
  contactee,
  contacter,
  name,
  ...rest
}: MessageModalProps) => {
  const handleSubmit = async ({ message }: MessageProps) => {
    try {
      const msg: MessageObject = {
        active: true,
        message: message,
        to: contactee,
        from: contacter as string,
        read: false,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}`,
        msg
      );
      refetch();
    } catch (err) {
      console.warn(err);
    }
  };

  const queryFn = async () => {
    try {
      const response = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}?from=${contacter}&to=${contactee}`
        )
      ).data;
      return response;
    } catch (e) {
      console.warn(e);
      return e;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery(
    `${contacter}${contactee}`,
    queryFn
  );

  return (
    <Modal {...rest}>
      <Modal.Header>{name}</Modal.Header>
      {isLoading && <Loading />}
      {data && data.length > 0 && (
        <Modal.Header>
          <MessageHub
            messages={_chunk(data as Message[], 2)[0].sort(
              (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
            )}
          />
        </Modal.Header>
      )}
      <Modal.Body>
        <Formulaire
          formInputs={message}
          onSubmit={handleSubmit}
          submitButtonValue="Envoyer"
        />
      </Modal.Body>
    </Modal>
  );
};
