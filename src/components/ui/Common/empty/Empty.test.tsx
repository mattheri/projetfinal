import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Empty } from "./Empty";

test("render a empty component", () => {
  renderWithRecoil(<Empty />);
});
