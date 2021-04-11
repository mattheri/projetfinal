import { renderWithRecoil } from "../../../../../../test-utils/renderWithRecoil";
import { Checkbox } from "./Checkbox";

test("render a checkbox", () => {
  const checkbox = renderWithRecoil(
    <Checkbox
      id="checkbox"
      label="Another checkbox"
      handler={() => console.log("handler")}
      touched={false}
      value={"false"}
      error=""
    />
  );

  expect(checkbox.baseElement).toBeInTheDocument();
  (checkbox.baseElement as HTMLInputElement).value = "true";
  expect(checkbox.baseElement).toBeTruthy();
});
