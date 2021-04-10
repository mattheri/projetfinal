import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useIntersectionObserver } from "./useIntersectionObserver";

export const useQueryOnObserverPosition = (
  ref: React.RefObject<HTMLElement>,
  resource: string | undefined
) => {
  const [fetched, shouldFetch] = React.useState(false);

  const fetchResource = async () => {
    try {
      const response = await axios.get(
        `https://lit-shelf-44437.herokuapp.com/api/${resource}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  const response = useQuery(`${resource}`, fetchResource, { enabled: fetched });

  const observerCallback = async (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting && !fetched) {
      shouldFetch(true);
      observer.disconnect();
    }
  };

  useIntersectionObserver(ref, observerCallback);

  return {
    data: response.data,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
    status: response.status,
  };
};
