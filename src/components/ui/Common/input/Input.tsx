import React from "react";
import { ColProps } from "react-bootstrap";
import { IForm, OptionValue } from "../../../../react-app-env";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { ExpandingTextArea } from "./expandingTextarea/ExpandingTextArea";
import { Select } from "./select/Select";
import { Checkbox } from "./checkbox/Checkbox";

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
    options: OptionValue[] | undefined;
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
  options,
  ...col
}: InputProps) => {
  let component: any = Form.Control;
  if (type === "textarea") {
    component = ExpandingTextArea;
  } else if (type === "select") {
    component = Select;
  } else if (type === "checkbox") {
    component = Checkbox;
  }
  return (
    <Col {...col}>
      {type !== "checkbox" && <Form.Label>{label}</Form.Label>}
      <Form.Control
        id={id}
        type={type}
        name={id}
        onChange={handler}
        value={value}
        onBlur={onBlur}
        isInvalid={touched && !!error}
        as={component}
        handler={handler}
        options={options}
        label={label}
      />
      <Form.Control.Feedback as="small" type="invalid">
        {touched && error}
      </Form.Control.Feedback>
    </Col>
  );
};
