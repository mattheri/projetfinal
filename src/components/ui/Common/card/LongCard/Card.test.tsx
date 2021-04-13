import React from "react";
import { LongCard } from "./LongCard";
import { renderWithRecoil } from "../../../../../../test-utils/renderWithRecoil";

test("Renders a long card", () => {
  const card = renderWithRecoil(
    <LongCard
      title="Test"
      subtitle="test"
      sub="test"
      footer="test"
      body="bodytest"
    />
  );

  expect(card.baseElement).toBeInTheDocument();
});
