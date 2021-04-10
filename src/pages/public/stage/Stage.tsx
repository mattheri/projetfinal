import { useParams } from "react-router-dom";
import { queryFn } from "utils/queryFn";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import { OffreStage } from "react-app-env";
import { StageComponent } from "components/ui/Public/stage/Stage";
import { Loader } from "components/ui/Common/loader/Loader";

const queryKey = uuidv4();

export const Stage = () => {
  const params = useParams();

  const query: () => Promise<OffreStage> = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/stage/${params.id}`
  );

  const { data, status } = useQuery(queryKey, query);

  return (
    <main>
      <Container className="my-5">
        <Loader component={<StageComponent stage={data} />} status={status} />
      </Container>
    </main>
  );
};
