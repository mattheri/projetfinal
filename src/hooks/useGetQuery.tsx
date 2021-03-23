import React from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const useGetQuery = (
  resource: string | undefined,
  options?: UseQueryOptions
) => {
  const [querykey] = React.useState(uuidv4());

  const queryFn = async () => {
    try {
      const response = await (
        await axios.get(`${process.env.REACT_APP_API}${resource}`)
      ).data;
      return response;
    } catch (err) {
      console.warn(err);
      return err;
    }
  };

  const { data, isError, isLoading, refetch } = useQuery(querykey, {
    queryFn: queryFn,
    ...options,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
