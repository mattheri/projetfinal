import React from "react";
import { renderWithRecoil } from "../../../../../../test-utils/renderWithRecoil";
import { ExpandingTextArea } from "./ExpandingTextArea";

test("expanding text area is rendering", () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const handler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = text;
  };
  const textarea = renderWithRecoil(
    <ExpandingTextArea
      id="test"
      value=""
      error=""
      handler={handler}
      onBlur={() => {}}
      placeholder="Hello there"
      touched={true}
      type="textarea"
    />
  );
  const ta = textarea.getByPlaceholderText("Hello there");
  ta.textContent = text;
  expect(ta.textContent?.length).toBeGreaterThan(0);
});
