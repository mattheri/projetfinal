import React from "react";
import axios from "axios";
import { useIntersectionObserver } from "./useIntersectionObserver";
import _memoize from "lodash/memoize";
import { useInfiniteQuery } from "react-query";

export const useInfiniteQueryOnObserverPosition = (
  ref: React.RefObject<HTMLElement>,
  resource: string | undefined
) => {
  const fetchResource = async ({ pageParam = 0 }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}${resource}/paginated?page=${pageParam}&perpage=4`
      );
      return response.data;
    } catch (err) {
      console.warn(err);
      return err;
    }
  };

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(`${resource}state`, fetchResource, {
    getNextPageParam: (lastPage) => lastPage.cursor ?? false,
  });

  const observerCallback = async (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => {
    if (
      data &&
      entry.intersectionRatio >= 0.2 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      await fetchNextPage();
    }
    if (!hasNextPage) {
      observer.disconnect();
    }
  };

  const fill = () => {
    const array = [];
    const limit = 1;
    const increment = 0.1;
    let current = 0;
    while (current < limit) {
      array.push(current);
      current += increment;
    }
    return array;
  };

  useIntersectionObserver(ref, observerCallback, { threshold: fill() });

  return {
    data: data,
    isLoading: isLoading,
    isError: isError,
  };
};
