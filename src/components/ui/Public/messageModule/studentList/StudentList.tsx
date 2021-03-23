import ListGroup from "react-bootstrap/ListGroup";
import { useAuth } from "../../../../../hooks/useAuth";
import { useGetQuery } from "../../../../../hooks/useGetQuery";
import { useRecoilState } from "recoil";
import { messageModuleState } from "../../../../../state/messageModuleState";

export const StudentList = () => {
  const { currentUser } = useAuth();
  const [
    currentMessageModuleState,
    setCurrentMessageModuleState,
  ] = useRecoilState(messageModuleState(currentUser?._id as string));
  const { data, isLoading } = useGetQuery(
    `${process.env.REACT_APP_MESSAGES}?from=${currentUser?._id}&to=${currentMessageModuleState.studentSelected?._id}`
  );
  return <ListGroup></ListGroup>;
};
