import React from "react";
import { QueryClient } from "react-query";
import axios from "axios";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { v4 as uuidv4 } from "uuid";

type ServerState = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  data: null | any;
};
export const useQueryOnObserverPosition = (
  ref: React.RefObject<HTMLElement>,
  resource: string | undefined
) => {
  const [serverState, setServerState] = React.useState<ServerState>({
    isLoading: true,
    isError: false,
    error: null,
    data: null,
  });

  const fetchResource = async () => {
    try {
      const response = await axios.get(
        `https://lit-shelf-44437.herokuapp.com/api/${resource}`
      );
      return response.data;
    } catch (err) {
      setServerState((state) =>
        Object.assign({}, state, {
          isError: true,
          error: err,
          isLoading: false,
        })
      );
    }
  };

  const queryClient = new QueryClient();

  const observerCallback = async (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting && !serverState.data) {
      const data = await queryClient.fetchQuery(uuidv4(), fetchResource);
      setServerState((state) =>
        Object.assign({}, state, { data: data, isLoading: false })
      );
      observer.disconnect();
    }
  };

  useIntersectionObserver(ref, observerCallback);

  return {
    data: serverState.data,
    isLoading: serverState.isLoading,
    isError: serverState.isError,
    error: serverState.error,
  };
};
