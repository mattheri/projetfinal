import { useAuth } from "hooks/useAuth";
import { useMessages } from "hooks/useMessages";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { MessageHub } from "components/ui/Common/messagehub/MessageHub";
import { Loading } from "components/ui/Common/loading/Loading";

export const SelectedMessages = () => {
  const { currentUser } = useAuth();
  const params = useParams();
  const { Submit, data, isError, isLoading, refetch } = useMessages(
    params.user,
    params.id
  );

  return (
    <Container>
      {isLoading && <Loading />}
      {data && <MessageHub messages={data} id={params.user} />}
      {Submit}
    </Container>
  );
};
