import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Loading } from "./Loading";

test("render a loading", () => {
  renderWithRecoil(<Loading />);
});
