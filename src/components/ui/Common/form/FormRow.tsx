import React from "react";
import Form from "react-bootstrap/Form";

type FormRowProps = {
  children: JSX.Element | JSX.Element[];
};

export const FormRow = ({ children }: FormRowProps) => (
  <Form.Row className="align-items-center">{children}</Form.Row>
);
