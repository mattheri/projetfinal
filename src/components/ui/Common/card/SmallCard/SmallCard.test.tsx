import { renderWithRecoil } from "../../../../../../test-utils/renderWithRecoil";
import { SmallCard } from "./SmallCard";

test("render a small card", () => {
  renderWithRecoil(
    <SmallCard title="Test" subtitle="test" footer="test" body="bodytest" />
  );
});
