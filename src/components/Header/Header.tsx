/* eslint-disable */
import React from "react";
import classnames from "classnames";
import { Navigation } from "../Navbar/Navigation";
import "./Header.scss";

type HeaderProps = {
  full?: boolean;
};

/**
 * Header element. If the location is "/", take up the whole screen.
 * Otherwise, takes only half.
 * @param full boolean. Should it take up the whole screen or not.
 */
export const Header = ({ full }: HeaderProps) => {
  const [height, setHeight] = React.useState(0);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (headerRef.current)
      setHeight(Math.round(headerRef.current?.getBoundingClientRect().height));
  }, [headerRef, height, full]);

  return (
    <header className={classnames({ ["full"]: full === true })} ref={headerRef}>
      <Navigation />
      {height && (
        <img
          src={`https://via.placeholder.com/${window.innerWidth}x${height}`}
          className="background-image"
          alt="Header"
          loading="lazy"
          decoding="async"
        />
      )}
    </header>
  );
};
