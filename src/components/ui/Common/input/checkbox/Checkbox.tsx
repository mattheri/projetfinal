import Form from "react-bootstrap/Form";
import { InputProps } from "../Input";

type CheckboxProps = InputProps;

export const Checkbox = ({
  id,
  label,
  handler,
  touched,
  value,
  error,
}: CheckboxProps) => {
  return (
    <Form.Check
      id={id}
      name={id}
      label={label}
      onChange={handler}
      value={value}
      isInvalid={touched && !!error}
      feedback={error}
      feedbackTooltip
    />
  );
};
