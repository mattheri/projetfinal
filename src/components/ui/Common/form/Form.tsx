import { useFormik } from "formik";
import { motion, MotionProps } from "framer-motion";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { IForm } from "../../../../react-app-env";
import { addColumns } from "./addColumns";
import { addRow } from "./addRow";
import { addToFormRow } from "./addToFormRow";
import { buttonValidation } from "./buttonValidation";
import { column } from "./column";
import { compareRow } from "./compareRow";
import { createInputsArray } from "./inputs";
import { validate } from "./validate";

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

  const Inputs = createInputsArray(formik, formInputs);

  const FormRows: (
    | JSX.Element
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }>
  )[] = [];

  let cursor = 0;

  do {
    addToFormRow(
      FormRows,
      compareRow(
        Inputs,
        addRow(
          cursor,
          addColumns(column(formInputs[cursor]), column(formInputs[cursor - 1]))
        )
      )
    );
    if (!formInputs[cursor]) {
      cursor = 0;
    } else {
      cursor++;
    }
  } while (cursor);

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
