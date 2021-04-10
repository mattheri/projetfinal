/* eslint-disable */
import React from "react";

type ObserverOptions = {
  root?: Element;
  rootMargin?: string;
  threshold?: number | number[];
};

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  observerCallback: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  options?: ObserverOptions
) => {
  const observerFunction = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      observerCallback.apply(observer, [entry, observer]);
    });
  };
  let observer = React.useRef<IntersectionObserver>(null);

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer = { current: new IntersectionObserver(observerFunction, options) };

    const { current: currentObserver } = observer;

    if (observer.current && ref.current) {
      observer.current.observe(ref.current);
    }

    return () => currentObserver?.disconnect();
  }, [ref, observer, options?.root, options?.rootMargin, options?.threshold]);
};
