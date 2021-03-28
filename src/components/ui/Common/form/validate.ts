export const validate = (formInputs: any) => {
  return (value: any) => {
    let errors: { [x: string]: string | undefined } = {};
    // For each validate function in the formInputs prop
    formInputs.forEach((input: any) => {
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
};
