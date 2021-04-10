/* eslint-disable */
import classnames from "classnames";
import "./SmallText.scss";

type SmallTextProps = {
  type?: "error" | "text" | "warning";
  margins?: boolean;
  condensed?: boolean;
};

export const SmallText = ({
  type = "text",
  condensed = false,
  margins = true,
  children,
}: React.PropsWithChildren<SmallTextProps>) => {
  const As = condensed ? "small" : "p";
  return (
    <As
      className={classnames("small-text", {
        ["my-3"]: margins,
        ["small-text-text"]: type === "text",
        ["small-text-error"]: type === "error",
        ["small-text-warning"]: type === "warning",
      })}
    >
      {children}
    </As>
  );
};
