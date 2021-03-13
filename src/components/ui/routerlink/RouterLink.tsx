import React from "react";
import { Link, LinkProps } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ButtonProps } from "react-bootstrap";
import "./RouterLink.scss";

type RouterLinkProps = ButtonProps & LinkProps;

export const RouterLink = ({
  to,
  variant,
  children,
  ...rest
}: React.PropsWithChildren<RouterLinkProps>) => (
  <Button to={to} variant={variant} as={Link} {...rest}>
    {children}
  </Button>
);
