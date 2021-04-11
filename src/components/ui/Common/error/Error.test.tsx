import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Error } from "./Error";

test("render an error component", () => {
  const element = renderWithRecoil(<Error />);
  expect(element.baseElement).toBeInTheDocument();
});
