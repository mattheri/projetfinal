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
    to: "",
    from: currentUser?.entiteId,
    name: "",
  });
  const handleShow = ({ to, name }: Omit<MessageModalProps, "from">) => {
    setResource({ to, from: currentUser?.entiteId, name });
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
