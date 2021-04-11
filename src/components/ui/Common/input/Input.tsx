import React from "react";
import { ColProps } from "react-bootstrap";
import { IForm, OptionValue } from "../../../../react-app-env";
import Form from "react-bootstrap/Form";
import { ExpandingTextArea } from "./expandingTextarea/ExpandingTextArea";
import { Select } from "./select/Select";
import { Checkbox } from "./checkbox/Checkbox";
import { DatepickerInput } from "./datepicker/DatepickerInput";

export type InputProps = Pick<IForm, "id" | "type" | "label"> &
  ColProps & {
    handler: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
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
  const componentToRender: { [key: string]: JSX.Element } = {
    textarea: (
      <>
        <Form.Label>{label}</Form.Label>
        <ExpandingTextArea
          error={error}
          handler={handler}
          id={id}
          onBlur={onBlur}
          placeholder={placeholder}
          touched={touched}
          type={type}
          value={value}
        />
      </>
    ),
    select: (
      <>
        <Form.Label>{label}</Form.Label>
        <Select
          error={error}
          handler={handler}
          id={id}
          options={options}
          touched={touched}
          type={type}
          value={value}
        />
      </>
    ),
    checkbox: (
      <Checkbox
        error={error}
        handler={handler}
        id={id}
        touched={touched}
        value={value}
        label={label}
      />
    ),
    datepicker: (
      <>
        <Form.Label>{label}</Form.Label>
        <DatepickerInput
          error={error}
          handler={handler}
          id={id}
          onBlur={onBlur}
          placeholder={placeholder}
          touched={touched}
          type={type}
          value={value}
        />
      </>
    ),
    text: (
      <>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          id={id}
          type={type}
          name={id}
          onChange={handler}
          value={value}
          onBlur={onBlur}
          isInvalid={touched && !!error}
        />
      </>
    ),
    email: (
      <>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          id={id}
          type={type}
          name={id}
          onChange={handler}
          value={value}
          onBlur={onBlur}
          isInvalid={touched && !!error}
        />
      </>
    ),
    password: (
      <>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          id={id}
          type={type}
          name={id}
          onChange={handler}
          value={value}
          onBlur={onBlur}
          isInvalid={touched && !!error}
        />
      </>
    ),
  };

  return (
    <>
      {componentToRender[type]}
      <Form.Control.Feedback as="small" type="invalid">
        {touched && error}
      </Form.Control.Feedback>
    </>
  );
};
