import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { List } from "./List";

test("render a list", () => {
  renderWithRecoil(<List children={["Hello", "There"]} />);
});
