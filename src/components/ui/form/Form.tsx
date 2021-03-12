import React from "react";
import Form from "react-bootstrap/Form";
import { IForm } from "../../../react-app-env";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { Input } from "../input/Input";
import Col from "react-bootstrap/Col";
import { FormRow } from "./FormRow";

type FormProps = {
  formInputs: IForm[];
  initialValues?: { [key: string]: string };
};

export const Formulaire = ({ formInputs, initialValues }: FormProps) => {
  // Use the initialValues prop or
  // build an object using the id of the input as the key and
  // initialize it as an empty string
  const values =
    initialValues ||
    Object.fromEntries(formInputs.map((inputs) => [inputs.id, ""]));

  const handleSubmit = (value: typeof values) => {
    console.log(value);
  };

  const validate = (value: typeof values) => {
    let errors: { [x: string]: string | undefined } = {};
    // For each validate function in the formInputs prop
    formInputs.forEach((input) => {
      // Run the function by passing the formik.values arg
      // using the input.id as the key.
      // Merge the returning value from the validate function
      // into the errors object
      errors = {
        ...errors,
        [`${input.id}`]: input.validate && input.validate(value[`${input.id}`]),
      };
    });

    // If the value of the error is falsy, remove it
    for (let key in errors) {
      if (!errors[key]) {
        delete errors[key];
      }
    }

    // Return the errors object
    return errors;
  };

  const formik = useFormik({
    initialValues: values,
    onSubmit: handleSubmit,
    validateOnChange: true,
    validate: validate,
  });

  const handleButtonValidation = () => {
    // Check whether the number of required fields that has a value is higher
    // than the number of required fields
    const requireds =
      formInputs.filter((inputs) => {
        if (inputs.required) {
          return formik.values[`${inputs.id}`].length > 0;
        }

        return null;
      }).length < formInputs.filter((inputs) => inputs.required).length;

    // Checks if the formik.errors object has any errors and returns a boolean
    const errors = !!Object.entries(formik.errors).filter(
      ([key, value]) => value && value.length > 0
    ).length;

    // If either of the above statements are true, return true
    if (requireds || errors) {
      return true;
    }

    // Otherwise, return false
    return false;
  };

  // Push the Inputs to an array
  const Inputs = formInputs.map((inputs) => (
    <Form.Group as={Col}>
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
        {...inputs.span}
      />
    </Form.Group>
  ));

  const FormRows = formInputs.map((input, index) => {
    // If we are at least at index 0, initialize the row to the input row
    // Otherwise, initialize it to 0
    let row: number = (formInputs[index - 1] && formInputs[index - 1].row) || 0;
    // Initialize an array that will contain the inputs
    let children: JSX.Element[] = [];
    // If the current value in the row variable isn't the same as the value in input.row
    if (row !== input.row) {
      // Push all Inputs in the children array that are of the same value as input.row
      Inputs.forEach((inputs) => {
        inputs.props.children.props.row === input.row && children.push(inputs);
      });
      // Add them to the children props of the FormRow element
      // The FormRow element is only a wrapper for a Form.Row with a children props
      const f = FormRow({ children: children });
      // Empty the children array
      children = [];
      return f;
    }
    // A fragment is removed at render time but is still a valid element
    // It is there basically so that React renders nothing but doesn't complain either.
    return React.Fragment;
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {FormRows.map((inputs) => inputs)}
      <Col>
        <Button type="submit" disabled={handleButtonValidation()}>
          Submit
        </Button>
      </Col>
    </Form>
  );
};
