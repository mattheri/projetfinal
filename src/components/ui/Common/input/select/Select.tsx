import Form from "react-bootstrap/Form";
import { InputProps } from "../Input";
import { OptionValue } from "../../../../../react-app-env";

type SelectProps = InputProps;

export const Select = ({
  id,
  type,
  label,
  handler,
  onBlur,
  touched,
  value,
  error,
  placeholder,
  options,
}: SelectProps) => {
  console.log(options);
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
