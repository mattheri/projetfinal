import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Logo } from "./Logo";

test("render a logo", () => {
  const logo = renderWithRecoil(<Logo />);
  expect(logo.baseElement).toBeInTheDocument();
});
