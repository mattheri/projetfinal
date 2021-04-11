import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Formulaire } from "./Form";
import { login } from "forms/login/login";

test("render a form", () => {
  const handleSubmit = (values: { [key: string]: string }) => {
    expect(values).toBeTruthy();
  };
  const form = renderWithRecoil(
    <Formulaire
      formInputs={login}
      onSubmit={handleSubmit}
      submitButtonValue="Submit"
    />
  );
  form.findByTestId("loginUsername").then((element) => {
    const i = element as HTMLInputElement;
    expect(i).toBeInTheDocument();
    i.value = "mathieu.theriault89@gmail.com";
  });
  form.findByTestId("loginPassword").then((element) => {
    const i = element as HTMLInputElement;
    expect(i).toBeInTheDocument();
    i.value = "a1032010";
  });
  form.findByText("Submit").then((element) => {
    element.click();
  });
});
