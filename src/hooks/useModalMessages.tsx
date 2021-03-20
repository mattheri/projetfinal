import React from "react";
import {
  MessageModal,
  MessageModalProps,
} from "../components/ui/Public/messageModal/MessageModal";
import { useAuth } from "./useAuth";

export const useModalMessages = () => {
  const [show, setShow] = React.useState(false);
  const { currentUser } = useAuth();
  const [resource, setResource] = React.useState<MessageModalProps>({
    contactee: "",
    contacter: currentUser?._id,
    name: "",
  });
  const handleShow = ({
    contactee,
    name,
  }: Omit<MessageModalProps, "contacter">) => {
    setResource({ contactee, contacter: currentUser?._id, name });
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return {
    handleShow,
    Modal: MessageModal.call(this, {
      show: show,
      onHide: handleClose,
      ...resource,
    }),
  };
};
