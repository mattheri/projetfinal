import React from "react";
import Form from "react-bootstrap/Form";
import { InputProps } from "../Input";
import "./ExpandingTextarea.scss";

export const ExpandingTextArea = ({
  id,
  type,
  label,
  handler,
  onBlur,
  touched,
  value,
  error,
  placeholder,
}: InputProps) => {
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handler(e);
    if (ref.current) {
      ref.current.innerText = e.target.value;
      setHeight(ref.current.offsetHeight);
    }
  };
  return (
    <div className="position-relative">
      <div className="referrer form-control" ref={ref}></div>
      <Form.Control
        as="textarea"
        id={id}
        type={type}
        name={id}
        onChange={handleChange}
        value={value}
        onBlur={onBlur}
        isInvalid={touched && !!error}
        placeholder={placeholder}
        style={{ height: `${height > 0 && height}px` }}
        className="referree"
      />
    </div>
  );
};
