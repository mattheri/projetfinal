import React from "react";
import { render } from "@testing-library/react";
import { LongCard } from "./LongCard";

test("Renders a long card", () => {
  render(
    <LongCard
      title="Test"
      subtitle="test"
      sub="test"
      footer="test"
      body="bodytest"
    />
  );
});
