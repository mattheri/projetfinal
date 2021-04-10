import Form from "react-bootstrap/Form";
import { InputProps } from "../Input";

type SelectProps = Pick<
  InputProps,
  "id" | "type" | "handler" | "touched" | "value" | "error" | "options"
>;

export const Select = ({
  id,
  type,
  handler,
  touched,
  value,
  error,
  options,
}: SelectProps) => {
  return (
    <Form.Control
      as="select"
      id={id}
      type={type}
      name={id}
      onChange={handler}
      value={value}
      isInvalid={touched && !!error}
    >
      {options &&
        options.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
    </Form.Control>
  );
};
