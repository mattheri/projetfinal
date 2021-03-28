import React from "react";
import Form from "react-bootstrap/Form";
import { IForm } from "../../../../react-app-env";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { Input } from "../input/Input";
import Col from "react-bootstrap/Col";
import { FormRow } from "./FormRow";
import { motion, MotionProps } from "framer-motion";
import { validate } from "./validate";
import { buttonValidation } from "./buttonValidation";

type OtherChildren = {
  row: number;
  children: JSX.Element | JSX.Element[];
};

type FormProps = MotionProps & {
  formInputs: IForm[];
  initialValues?: { [key: string]: string };
  submitButtonValue?: string;
  onSubmit: (...args: any) => void;
  child?: OtherChildren | OtherChildren[];
  resetFormFields?: boolean;
};

export const Formulaire = ({
  formInputs,
  initialValues,
  submitButtonValue = "Submit",
  onSubmit,
  child,
  children,
  resetFormFields,
  ...motionProps
}: React.PropsWithChildren<FormProps>) => {
  const arrayChild = Array.isArray(child) ? child : [child];

  const validateValues = validate(formInputs);

  const formik = useFormik({
    initialValues: Object.fromEntries(
      formInputs.map((inputs) => [inputs.id, ""])
    ),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      if (resetFormFields) resetForm({ values: undefined });
    },
    validateOnChange: true,
    validate: validateValues,
  });

  const _id = React.useMemo(() => initialValues && initialValues["id"], [
    initialValues && initialValues["id"],
  ]);

  React.useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    } else {
      formik.setValues(
        Object.fromEntries(formInputs.map((inputs) => [inputs.id, ""]))
      );
    }
  }, [_id]);

  const handleButtonValidation = buttonValidation(formInputs, formik);

  // Push the Inputs to an array
  const Inputs = formInputs.map((inputs) => (
    <Form.Group {...inputs.span} key={inputs.id} as={Col}>
      <Input
        key={inputs.id}
        label={inputs.label}
        placeholder={inputs.placeholder}
        handler={formik.handleChange}
        id={inputs.id}
        type={inputs.type}
        onBlur={formik.handleBlur}
        value={formik.values[`${inputs.id}`]}
        error={formik.errors[`${inputs.id}`]}
        touched={formik.touched[`${inputs.id}`]}
        row={inputs.row}
        options={inputs.options}
      />
    </Form.Group>
  ));

  const FormRows: (
    | JSX.Element
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }>
  )[] = [];

  const length = arrayChild.length
    ? arrayChild.length + formInputs.length
    : formInputs.length;
  /**
   * TODO I should be able to create a form of any length dynamically.
   */

  for (let index = 0; index < length; index++) {
    // If we are at least at index 0, initialize the row to the input row
    // Otherwise, initialize it to 0
    let row: number =
      (formInputs[index - 1] && formInputs[index - 1].row) || index;
    // Initialize an array that will contain the inputs
    let children: JSX.Element[] = [];
    if (child) {
      arrayChild.forEach((c) => {
        if (c?.row) {
          if (c.row === index) {
            Array.isArray(c?.children)
              ? c?.children.forEach(
                  (child) => !children.includes(child) && children.push(child)
                )
              : c?.children &&
                !children.includes(c?.children) &&
                children.push(c.children as JSX.Element);
          }
        }
      });
    }
    if (formInputs[index]) {
      // If the current value in the row variable isn't the same as the value in input.row
      if (row !== formInputs[index].row) {
        // Push all Inputs in the children array that are of the same value as input.row
        Inputs.forEach((inputs) => {
          inputs.props.children.props.row === formInputs[index].row &&
            children.push(inputs);
        });
      }
      // Add them to the children props of the FormRow element
      // The FormRow element is only a wrapper for a Form.Row with a children props
      if (children.length) {
        const f = FormRow({ children: children });
        // Empty the children array
        children = [];
        FormRows.push(f);
      }
      // A fragment is removed at render time but is still a valid element
      // It is there basically so that React renders nothing but doesn't complain either.
      FormRows.push(React.Fragment);
    }
  }

  return (
    <motion.form {...motionProps} onSubmit={formik.handleSubmit}>
      {FormRows.map((inputs) => inputs)}
      <Form.Row>{children}</Form.Row>
      <Form.Row>
        <Form.Group sm={12} as={Col}>
          <Button type="submit" disabled={handleButtonValidation()}>
            {submitButtonValue}
          </Button>
        </Form.Group>
      </Form.Row>
    </motion.form>
  );
};
