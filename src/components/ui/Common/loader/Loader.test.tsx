import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Loader } from "./Loader";
import { Loading } from "components/ui/Common/loading/Loading";

test("render a loader", () => {
  const status = "loading";
  renderWithRecoil(<Loader status={status} component={<Loading />} />);
});
