import React from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useIntersectionObserver } from "./useIntersectionObserver";

export const useInfiniteQueryOnObserverPosition = (
  ref: React.RefObject<HTMLElement>,
  resource: string | undefined
) => {
  const fetchResource = async ({ pageParam = 0 }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}${resource}?page=${pageParam}&perpage=4`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
  } = useInfiniteQuery(`${resource}`, fetchResource, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  const observerCallback = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => {
    if (
      entry.isIntersecting &&
      entry.intersectionRatio >= 50 &&
      entry.intersectionRatio <= 60 &&
      hasNextPage
    ) {
      fetchNextPage();
    }

    if (!hasNextPage) {
      observer.disconnect();
    }
  };

  useIntersectionObserver(ref, observerCallback);

  return { data, isLoading, isError };
};
