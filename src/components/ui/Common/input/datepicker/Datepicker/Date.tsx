import React from "react";
import classnames from "classnames";
import "./Date.scss";

type DateProps = {
  date?: number;
  blank?: boolean;
  onClick?: (date: number) => void;
};

export const Date = ({ date, blank, onClick }: DateProps) => {
  const handleClick = () => {
    if (onClick && date) {
      return onClick(date);
    }
  };
  return (
    <td
      onClick={handleClick}
      className={classnames("datepicker-date", { ["blank"]: blank })}
    >
      {date}
    </td>
  );
};
