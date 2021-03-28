import { useClickOutside } from "hooks/useClickOutside";
import { DateTime } from "luxon";
import React from "react";
import Button from "react-bootstrap/Button";
import { Date } from "./Date";
import "./Datepicker.scss";

type DatePickerProps = {
  onClick: (date: string) => void;
  toggle: () => void;
};

/**
 * @param onClick calls a function with the date as the argument
 * @param toggle calls a function that shows or hide the calendar
 *
 * Calendar element. Will show a calendar that will start on the current month.
 */
export const Datepicker = ({ onClick, toggle }: DatePickerProps) => {
  /**
   * Sets the date to the current date
   */
  const [date, setDate] = React.useState(DateTime.now());

  /**
   * Ref for the datepicker element. Used with the click outside hook.
   */
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  /**
   * Adds one month to the date state.
   */
  const handleAddMonth = () => setDate((date) => date.plus({ months: 1 }));

  /**
   * Substracts one month to the date state.
   */
  const handleSubstractMonth = () =>
    setDate((date) => date.minus({ months: 1 }));

  /**
   * How many days there are in the month of the current date.
   */
  const daysInMonth = date.daysInMonth;

  /**
   * What is the first week day of the current date state month.
   */
  const firstDay = date.set({ day: 1 }).weekday;

  /**
   * What is the last week day of the current date state month.
   */
  const lastDay = date.set({ day: daysInMonth }).weekday;

  /**
   * When a user clicks on a date, it will call the function onClick, with the date as the argument.
   */
  const handleClick = (day: number) => {
    const chosenDate = DateTime.local(date.year, date.month, day);
    onClick(chosenDate.toLocaleString());
    toggle();
  };

  /**
   * Hook to close the date picker when the user clicks outside.
   */
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

  /**
   * Gets the number of days after the last day in the month
   */
  const numberOfDaysAfterLast = daysLeft[lastDay];

  /**
   * Gets the number of days before the first day of the month
   */
  const numberOfDaysBeforeFirst = firstDay;

  /**
   * How man days are there in total, counting the blank days.
   */
  const totalNumberofDays =
    numberOfDaysBeforeFirst + numberOfDaysAfterLast + daysInMonth;

  /**
   * Initialize the calendar to 1.
   */
  let calendarDay = 1;

  for (iterator; iterator < totalNumberofDays; iterator++) {
    /**
     * while the week is less than 7 days
     */
    if (week.length < 7) {
      /**
       * Check if the iterator is either smaller than the first day or higher than the number of days in the month
       */
      if (iterator < firstDay || calendarDay > daysInMonth) {
        /**
         * If it is, push a blank date
         */
        week.push(<Date blank />);
      } else {
        /**
         * Otherwise, it's a valid date, and increment the calendarDay by one.
         */
        week.push(<Date date={calendarDay} onClick={handleClick} />);
        calendarDay++;
      }
    }

    /**
     * If either the week is at 7 days or the iterator is at the day before the last
     */
    if (week.length === 7 || iterator === totalNumberofDays - 1) {
      /**
       * Check if the week is full of blanks
       */
      if (week[0].props.blank && week[6].props.blank) {
        /**
         * If it is, we don't want that, therefore, empty it.
         */
        week = [];
      }
      /**
       * Otherwise, push the week to the table row
       */
      tableRows.push(<tr>{week}</tr>);

      /**
       * Empty the week
       */
      week = [];
    }
  }

  /**
   * Then push the table rows to the month
   */
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
