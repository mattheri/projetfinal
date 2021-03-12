import React from "react";
import classnames from "classnames";
import "./Header.scss";
import { Navigation } from "../Navbar/Navigation";

type HeaderProps = {
  full?: boolean;
};

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
          alt="Header Image"
          loading="lazy"
          decoding="async"
        />
      )}
    </header>
  );
};
