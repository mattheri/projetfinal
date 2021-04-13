import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { List } from "./List";

test("render a list", () => {
  const list = renderWithRecoil(<List children={["Hello", "There"]} />);
  expect(list.baseElement).toBeInTheDocument();
});
