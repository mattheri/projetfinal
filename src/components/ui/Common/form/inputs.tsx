import { IForm } from "react-app-env";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Input } from "components/ui/Common/input/Input";

export const createInputsArray = (formik: any, formInputs: IForm[]) => {
  return formInputs.map((inputs) => (
    <>
      {inputs.title && (
        <Col xs={12}>
          <h3>{inputs.title}</h3>
        </Col>
      )}
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
    </>
  ));
};
