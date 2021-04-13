import React from "react";
import { Datepicker } from "./Datepicker";
import { DateTime } from "luxon";
import { renderWithRecoil } from "../../../../../../../test-utils/renderWithRecoil";

test("date is set as today", () => {
  const today = DateTime.fromJSDate(new Date(Date.now()));
  const compareDates = (date: string) => {
    const pickedDate = DateTime.fromJSDate(new Date(date));
    const year = today.year === pickedDate.year;
    const month = today.month === pickedDate.month;
    const day = today.day === pickedDate.day;

    expect(year).toBeTruthy();
    expect(month).toBeTruthy();
    expect(day).toBeTruthy();
  };
  const datepicker = renderWithRecoil(
    <Datepicker
      onClick={compareDates}
      toggle={() => console.log("toggling off")}
    />
  );

  const date = datepicker.getByText(today.day);
  date.click();
});
