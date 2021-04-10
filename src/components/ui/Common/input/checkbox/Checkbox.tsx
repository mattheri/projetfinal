import Form from "react-bootstrap/Form";
import { InputProps } from "../Input";

type CheckboxProps = Pick<
  InputProps,
  "id" | "label" | "handler" | "touched" | "value" | "error"
>;

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
      checked={!!value}
      isInvalid={touched && !!error}
      feedback={error}
      feedbackTooltip
    />
  );
};
