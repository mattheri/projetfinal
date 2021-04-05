import React from "react";
import classnames from "classnames";
import "./SideMenu.scss";
import { useClickOutside } from "../../../../hooks/useClickOutside";

type SideMenuProps = {
  toggle: boolean;
  className?: string;
  shade?: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const SideMenu = React.forwardRef(
  (
    { toggle, className, shade, children }: SideMenuProps,
    ref: React.ForwardedRef<any>
  ) => {
    return (
      <aside
        className={classnames("side-menu", {
          ["show"]: toggle,
          ["shade"]: shade,
        })}
      >
        <div
          ref={ref}
          className={classnames(
            "side-menu-inner",
            "position-relative",
            className
          )}
        >
          {children}
        </div>
      </aside>
    );
  }
);
