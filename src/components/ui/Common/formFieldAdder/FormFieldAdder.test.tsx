import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { FormFieldAdder } from "./FormFieldAdder";
import { login } from "forms/login/login";

test("render a form field adder", () => {
  renderWithRecoil(
    <FormFieldAdder
      formLength={1}
      add={() => {
        console.log("added");
      }}
      formObj={login[0]}
    />
  );
});
