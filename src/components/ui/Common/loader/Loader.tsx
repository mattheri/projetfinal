import React from "react";
import { Error } from "../error/Error";
import { Loading } from "../loading/Loading";

type LoaderProps = {
  status: "success" | "error" | "loading" | "idle";
  component: JSX.Element;
};

export const Loader = ({ status, component }: LoaderProps) => {
  const componentToLoad = {
    success: React.cloneElement(component),
    loading: <Loading />,
    idle: <Loading />,
    error: <Error />,
  };

  return componentToLoad[status];
};
