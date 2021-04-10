import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Formulaire } from "./Form";
import { login } from "forms/login/login";

test("render a form", () => {
  const handleSubmit = (values: { [key: string]: string }) => {
    console.log(values);
  };
  renderWithRecoil(<Formulaire formInputs={login} onSubmit={handleSubmit} />);
});
