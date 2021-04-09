import React from "react";
import { useParams } from "react-router-dom";
import { queryFn } from "utils/queryFn";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import { Loading } from "components/ui/Common/loading/Loading";
import { Error } from "components/ui/Common/error/Error";
import { OffreStage } from "react-app-env";
import { StageComponent } from "components/ui/Public/stage/Stage";

const queryKey = uuidv4();

export const Stage = () => {
  const params = useParams();

  const query: () => Promise<OffreStage> = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/stage/${params.id}`
  );

  const { data, status } = useQuery(queryKey, query);

  const component = {
    success: <StageComponent stage={data} />,
    loading: <Loading />,
    idle: <Loading />,
    error: <Error />,
  };

  return (
    <main>
      <Container className="my-5">{component[status]}</Container>
    </main>
  );
};
