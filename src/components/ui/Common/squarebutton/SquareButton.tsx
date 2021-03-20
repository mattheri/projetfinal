import classnames from "classnames";
import React from "react";
import { RouterLink, RouterLinkProps } from "../routerlink/RouterLink";
import "./SquareButton.scss";

export const SquareButton = ({
  children,
  to,
  ...rest
}: React.PropsWithChildren<RouterLinkProps>) => {
  return (
    <RouterLink
      to={to}
      {...rest}
      className={classnames("sqr-btn", rest.className)}
    >
      {children}
    </RouterLink>
  );
};
