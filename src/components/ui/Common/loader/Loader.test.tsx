import { renderWithRecoil } from "../../../../../test-utils/renderWithRecoil";
import { Loader } from "./Loader";
import { Loading } from "components/ui/Common/loading/Loading";
import { Error } from "../error/Error";
import { SmallText } from "../smalltext/SmallText";

test("render a loader", () => {
  const loading = renderWithRecoil(
    <Loader status="loading" component={<Loading />} />
  );
  expect(loading.baseElement).toBeInTheDocument();
  const error = renderWithRecoil(
    <Loader status="error" component={<Error />} />
  );
  expect(error.baseElement).toBeInTheDocument();
  const idling = renderWithRecoil(
    <Loader status="idle" component={<Loading />} />
  );
  expect(idling.baseElement).toBeInTheDocument();
  const actualComponent = renderWithRecoil(
    <Loader
      status="success"
      component={<SmallText>I am successful!</SmallText>}
    />
  );
  expect(actualComponent.baseElement).toHaveTextContent("I am successful!");
});
