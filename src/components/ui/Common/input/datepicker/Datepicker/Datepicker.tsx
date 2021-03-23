import React from "react";
import { DateTime } from "luxon";
import { Date } from "./Date";
import Button from "react-bootstrap/Button";
import "./Datepicker.scss";
import { useClickOutside } from "../../../../../../hooks/useClickOutside";

type DatePickerProps = {
  onClick: (date: string) => void;
  toggle: () => void;
};

export const Datepicker = ({ onClick, toggle }: DatePickerProps) => {
  const [date, setDate] = React.useState(DateTime.now());
  const datePickerRef = React.useRef<HTMLDivElement>(null);
  const handleAddMonth = () => setDate((date) => date.plus({ months: 1 }));
  const handleSubstractMonth = () =>
    setDate((date) => date.minus({ months: 1 }));

  const daysInMonth = date.daysInMonth;
  const firstDay = date.set({ day: 1 }).weekday;
  const lastDay = date.set({ day: daysInMonth }).weekday;

  const handleClick = (day: number) => {
    const chosenDate = DateTime.local(date.year, date.month, day);
    onClick(chosenDate.toLocaleString());
    toggle();
  };

  useClickOutside(datePickerRef, toggle);

  let iterator = 0;
  const month: JSX.Element[] = [];
  let tableRows = [];
  let week = [];
  //! 1 is Monday and 7 is Sunday
  const daysLeft: { [key: number]: number } = {
    7: 6,
    1: 5,
    2: 4,
    3: 3,
    4: 2,
    5: 1,
    6: 0,
  };
  const numberOfDaysAfterLast = daysLeft[lastDay];
  const numberOfDaysBeforeFirst = firstDay;
  const totalNumberofDays =
    numberOfDaysBeforeFirst + numberOfDaysAfterLast + daysInMonth;
  let calendarDay = 1;

  for (iterator; iterator < totalNumberofDays; iterator++) {
    if (week.length < 7) {
      if (iterator < firstDay || calendarDay > daysInMonth) {
        week.push(<Date blank />);
      } else {
        week.push(<Date date={calendarDay} onClick={handleClick} />);
        calendarDay++;
      }
    }
    if (week.length === 7 || iterator === totalNumberofDays - 1) {
      if (week[0].props.blank && week[6].props.blank) {
        week = [];
      }
      tableRows.push(<tr>{week}</tr>);
      week = [];
    }
  }
  tableRows.forEach((row) => month.push(row));

  const daysShort = [];
  const daysNames = ["D", "L", "M", "M", "J", "V", "S"];

  let dayIterator = 0;

  for (dayIterator; dayIterator < 7; dayIterator++) {
    daysShort.push(<th>{daysNames[dayIterator]}</th>);
  }

  return (
    <div ref={datePickerRef} className="datepicker">
      <div className="datepicker-controls">
        <Button className="p-1" onClick={handleSubstractMonth}>
          {"<"}
        </Button>
        <div className="datepicker-weekdays">
          {date.setLocale("fr").toLocaleString({ month: "long" })}{" "}
          {date.setLocale("fr").toLocaleString({ year: "numeric" })}
        </div>
        <Button className="p-1" onClick={handleAddMonth}>
          {">"}
        </Button>
      </div>
      <table>
        <thead>
          <tr>{daysShort}</tr>
        </thead>
        <tbody>{month}</tbody>
      </table>
    </div>
  );
};
