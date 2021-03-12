import React from "react";
import { ColProps } from "react-bootstrap";
import { IForm } from "../../../react-app-env";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

export type InputProps = Pick<IForm, "id" | "type" | "label"> &
  ColProps & {
    handler: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    value: string;
    error: string | undefined;
    touched: boolean | undefined;
    placeholder: string | undefined;
    row: number;
  };

export const Input = ({
  id,
  type,
  label,
  handler,
  onBlur,
  touched,
  value,
  error,
  placeholder,
  row,
  ...col
}: InputProps) => {
  return (
    <Col>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        name={id}
        onChange={handler}
        value={value}
        onBlur={onBlur}
      />
      <FormControl.Feedback as="small" type="invalid">
        {touched && error}
      </FormControl.Feedback>
    </Col>
  );
};
