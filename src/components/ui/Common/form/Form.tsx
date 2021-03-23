import React from "react";
import Form from "react-bootstrap/Form";
import { IForm } from "../../../../react-app-env";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { Input } from "../input/Input";
import Col from "react-bootstrap/Col";
import { FormRow } from "./FormRow";
import { motion, MotionProps } from "framer-motion";

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
};

export const Formulaire = ({
  formInputs,
  initialValues,
  submitButtonValue = "Submit",
  onSubmit,
  child,
  children,
  ...motionProps
}: React.PropsWithChildren<FormProps>) => {
  // const [values, setValues] = React.useState(
  //   Object.fromEntries(formInputs.map((inputs) => [inputs.id, ""]))
  // );
  // Use the initialValues prop or
  // build an object using the id of the input as the key and
  // initialize it as an empty string
  // const values =
  //   initialValues ||
  //   Object.fromEntries(formInputs.map((inputs) => [inputs.id, ""]));

  const arrayChild = Array.isArray(child) ? child : [child];

  const validate = (value: any) => {
    let errors: { [x: string]: string | undefined } = {};
    // For each validate function in the formInputs prop
    formInputs.forEach((input) => {
      // Run the function by passing the formik.values arg
      // using the input.id as the key.
      // Merge the returning value from the validate function
      // into the errors object
      errors = {
        ...errors,
        [`${input.id}`]:
          input.validate && input.validate(value[`${input.id}`] || ""),
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
    initialValues: Object.fromEntries(
      formInputs.map((inputs) => [inputs.id, ""])
    ),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm({ values: undefined });
    },
    validateOnChange: true,
    validate: validate,
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

  const handleButtonValidation = () => {
    // Check whether the number of required fields that has a value is higher
    // than the number of required fields
    const requireds =
      formInputs.filter((inputs) => {
        if (inputs.required) {
          return formik.values[`${inputs.id}`]?.length > 0;
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
