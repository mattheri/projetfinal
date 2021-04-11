import { renderWithRecoil } from "../../../../../../test-utils/renderWithRecoil";
import { DatepickerInput } from "./DatepickerInput";

test("render a datepicker input", () => {
  renderWithRecoil(
    <DatepickerInput
      error={""}
      handler={() => console.log("handler")}
      id="input"
      onBlur={() => console.log("onblur")}
      placeholder=""
      touched={false}
      type="date"
      value=""
    />
  );
});
