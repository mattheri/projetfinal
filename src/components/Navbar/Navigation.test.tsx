import { renderWithRecoil } from "../../../test-utils/renderWithRecoil";
import { Navigation } from "./Navigation";

test("navigation is rendered", () => {
  renderWithRecoil(<Navigation />);
});
