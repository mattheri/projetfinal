import { renderWithRecoil } from "../../../../../../test-utils/renderWithRecoil";
import { Checkbox } from "./Checkbox";

test("render a checkbox", () => {
  renderWithRecoil(
    <Checkbox
      id="checkbox"
      label="Another checkbox"
      handler={() => console.log("handler")}
      touched={false}
      value={"false"}
      error=""
    />
  );
});
