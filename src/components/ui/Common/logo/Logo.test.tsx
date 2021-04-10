import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Logo } from "./Logo";

test("render a logo", () => {
  renderWithRecoil(<Logo />);
});
