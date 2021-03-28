import React from "react";
import { IForm } from "react-app-env";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

type FormFieldAdder = {
  formLength: number;
  formObj: IForm;
  add: (v: IForm) => void;
  buttonText?: string;
};

export const FormFieldAdder = ({
  formLength,
  formObj,
  add,
  buttonText = "Ajouter",
}: FormFieldAdder) => {
  const handleAddToForm = () => {
    formObj.id = formObj.id + formLength;
    add(formObj);
  };

  return (
    <Col xs={12} className="py-3">
      <Button onClick={handleAddToForm}>{buttonText}</Button>
    </Col>
  );
};
