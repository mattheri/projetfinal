import React from "react";
import { useAuth } from "hooks/useAuth";
import { Message } from "react-app-env";
import { useQuery } from "react-query";
import { queryFn } from "utils/queryFn";

export const usePreviousApplication = (to: string | undefined) => {
  const { currentUser } = useAuth();
  const [hasApplied, setHasApplied] = React.useState(false);

  const query: () => Promise<Message[]> = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/message?from=${currentUser?.entiteId}&to=${to}`
  );
  const previousApplicationQuery = useQuery(`${to}`, query);

  React.useEffect(() => {
    setHasApplied(
      !!previousApplicationQuery.data?.filter((msg) => msg.read).length
    );
    console.log(previousApplicationQuery);
    console.log(previousApplicationQuery.dataUpdatedAt);
  }, [previousApplicationQuery.data, to, previousApplicationQuery]);

  return {
    hasApplied: hasApplied,
    refetch: previousApplicationQuery.refetch,
  };
};
