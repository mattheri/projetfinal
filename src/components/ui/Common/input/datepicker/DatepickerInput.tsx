import React from "react";
import Form from "react-bootstrap/Form";
import { InputProps } from "../Input";
import { Datepicker } from "./Datepicker/Datepicker";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

type DatePickerProps = Pick<
  InputProps,
  | "id"
  | "type"
  | "handler"
  | "onBlur"
  | "touched"
  | "value"
  | "error"
  | "placeholder"
>;

export const DatepickerInput = ({
  id,
  type,
  handler,
  onBlur,
  touched,
  value,
  error,
  placeholder,
}: DatePickerProps) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const handleShow = () => setShow(!show);
  // Formik tracks the changes using event.target.value
  // I needed to fire an event to do this.
  // I set some internal values, tracked by React
  // then I fire the event.
  // TODO need to find some way less hacky to trigger a change event
  const handleClick = (date: string) => {
    const event = new Event("input", { bubbles: true });
    const input = document.getElementById(id);
    const lastValue = (input as any).value;
    if (input) (input as any).value = date;
    const tracker = (input as any)._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input?.dispatchEvent(event);
  };
  return (
    <div className="position-relative">
      <InputGroup>
        <Form.Control
          ref={ref}
          as="input"
          disabled
          id={id}
          onChange={(ev) => {
            handler(ev);
          }}
          type={type}
          name={id}
          value={value}
          onBlur={onBlur}
          isInvalid={touched && !!error}
          placeholder={placeholder}
        />
        <InputGroup.Append>
          <Button onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-calendar"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {show && <Datepicker onClick={handleClick} toggle={handleShow} />}
    </div>
  );
};
