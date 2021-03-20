import React from "react";
import "./List.scss";

type ListProps = { keys?: string[] };

export const List = ({
  keys,
  children,
}: React.PropsWithChildren<ListProps>) => {
  return (
    <ul className="list">
      {keys?.map((key) => (
        <li key={key}>{key}</li>
      ))}
      {React.Children.map(children, (child) => (
        <li key={`${child}`}>{child}</li>
      ))}
    </ul>
  );
};
