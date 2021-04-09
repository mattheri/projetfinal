import { StagiaireComponent } from "components/ui/Public/StagiaireComponent/StagiaireComponent";
import { useAuth } from "hooks/useAuth";
import { Student } from "react-app-env";
import { useQuery } from "react-query";
import { queryFn } from "utils/queryFn";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { Loader } from "components/ui/Common/loader/Loader";

export const Stagiaire = () => {
  const { currentUser } = useAuth();
  const params = useParams();
  const query: () => Promise<Student> = queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_STUDENTS}/${params.id}`
  );
  const stagiaireQuery = useQuery(`${params.id}`, query);
  const etudiant = {
    courriel: currentUser?.courriel as string,
    ...(stagiaireQuery.data as Student),
  };

  return (
    <main>
      <Container className="my-5">
        <Loader
          status={stagiaireQuery.status}
          component={<StagiaireComponent etudiant={etudiant} />}
        />
      </Container>
    </main>
  );
};
