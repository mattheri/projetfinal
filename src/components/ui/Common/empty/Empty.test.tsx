import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Empty } from "./Empty";

test("render a empty component", () => {
  const empty = renderWithRecoil(<Empty />);

  expect(empty.baseElement).toBeInTheDocument();
});
