import React from "react";

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  observerCallback: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void
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

    observer = { current: new IntersectionObserver(observerFunction) };

    const { current: currentObserver } = observer;

    if (observer.current && ref.current) {
      observer.current.observe(ref.current);
    }

    return () => currentObserver?.disconnect();
  }, [ref, observer]);
};
