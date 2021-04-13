import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { FormFieldAdder } from "./FormFieldAdder";
import { login } from "forms/login/login";
import { IForm } from "react-app-env";

test("render a form field adder", () => {
  const form = login;
  const add = (v: IForm) => {
    form.concat(v);
  };
  const formFieldAdder = renderWithRecoil(
    <FormFieldAdder formLength={1} add={add} formObj={login[0]} />
  );

  const button = formFieldAdder.getByText("Ajouter");

  button.click();

  expect(form.length).toBeGreaterThanOrEqual(login.length);
});
