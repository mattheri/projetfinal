import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Error } from "./Error";

test("render an error component", () => {
  renderWithRecoil(<Error />);
});
