import classnames from "classnames";
import "./SquareButton.scss";
import { RouterLink, RouterLinkProps } from "../Common/routerlink/RouterLink";
import React from "react";

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
