import { useMessages } from "hooks/useMessages";
import _chunk from "lodash/chunk";
import { ModalProps } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Message } from "../../../../react-app-env";
import { Loading } from "../../Common/loading/Loading";
import { MessageHub } from "../../Common/messagehub/MessageHub";

export type MessageModalProps = ModalProps & {
  from: string | undefined;
  to: string;
  name: string;
};

export const MessageModal = ({
  to,
  from,
  name,
  ...rest
}: MessageModalProps) => {
  const { Submit, data, isLoading } = useMessages(from, to);

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
      <Modal.Body>{Submit}</Modal.Body>
    </Modal>
  );
};
