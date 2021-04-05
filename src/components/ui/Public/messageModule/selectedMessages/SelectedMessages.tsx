import { useAuth } from "hooks/useAuth";
import { useMessages } from "hooks/useMessages";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { MessageHub } from "components/ui/Common/messagehub/MessageHub";

export const SelectedMessages = () => {
  const { currentUser } = useAuth();
  const params = useParams();
  const { Submit, data, isError, isLoading, refetch } = useMessages(
    params.user,
    params.id
  );

  return (
    <Container>
      {data && <MessageHub messages={data} />}
      {Submit}
    </Container>
  );
};
