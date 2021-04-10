import { renderWithRecoil } from "../../../test-utils/renderWithRecoil";
import { Header } from "./Header";

test("header is rendered", () => {
  renderWithRecoil(<Header />);
});
