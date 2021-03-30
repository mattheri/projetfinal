import React from "react";
import Form from "react-bootstrap/Form";

/**
 * Adds the inputs to the current row or if, the inputs argument is empty, adds only a fragment.
 * @param inputs The inputs in the current row
 */
export const addToFormRow = (
  FormRows: (
    | JSX.Element
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }>
  )[],
  inputs: JSX.Element[]
) =>
  FormRows.push(
    inputs.length > 0 ? (
      <Form.Row>{inputs}</Form.Row>
    ) : (
      <React.Fragment></React.Fragment>
    )
  );
