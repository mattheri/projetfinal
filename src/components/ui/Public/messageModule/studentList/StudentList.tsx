import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import { Loading } from "components/ui/Common/loading/Loading";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { useAuth } from "hooks/useAuth";
import { Message, Student } from "react-app-env";
import Col from "react-bootstrap/Col";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { queryFn } from "utils/queryFn";

export const StudentList = () => {
  const params = useParams();
  const { currentUser } = useAuth();

  const queryStudents = async (id: string) => {
    return queryFn(
      "get",
      `${process.env.REACT_APP_API}${process.env.REACT_APP_STUDENTS}/${id}`
    )();
  };

  const queryMessages: () => Promise<Message[]> = queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}/${params.id}`
  );

  const messages = useQuery([params.id], queryMessages, {
    enabled: !!params.id,
  });

  const queryStudentsWithMessages = async (): Promise<Student[]> => {
    const students = (messages.data as Message[]).map((msg) => {
      if (msg.from !== params.id) {
        return msg.from;
      }

      if (msg.to !== params.id) {
        return msg.to;
      }
    });

    const uniqueStudents = [...new Set(students)];

    return Promise.all(
      (uniqueStudents as string[]).map((student) => queryStudents(student))
    );
  };

  const students = useQuery(
    [currentUser?._id, params.id],
    queryStudentsWithMessages,
    { enabled: !!messages.data }
  );

  const lastStudentMessage = (id: string) => {
    return (messages.data as Message[]).filter((msg) => {
      if (msg.from === id || msg.to === id) {
        return msg;
      }
    })[0].message;
  };

  return (
    <>
      {students.isLoading && <Loading />}
      {students.data &&
        students.data.map((student) => (
          <Col key={student._id} lg={4}>
            <SmallCard
              title={`${student.prenom} ${student.nom}`}
              subtitle={student.formations.join(" ")}
              body={lastStudentMessage(student._id)}
              footer={
                <>
                  <RouterLink to={`stagiaire/${student._id}`}>
                    Voir le profil
                  </RouterLink>
                  <RouterLink
                    variant="link"
                    to={`/messages/${student._id}/${params.id}`}
                  >
                    Accéder aux messages
                  </RouterLink>
                </>
              }
            />
          </Col>
        ))}
    </>
  );
};
