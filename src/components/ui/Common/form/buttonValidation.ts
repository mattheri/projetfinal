export const buttonValidation = (formInputs: any, formik: any) => {
  return () => {
    // Check whether the number of required fields that has a value is higher
    // than the number of required fields
    const requireds =
      formInputs.filter((inputs: any) => {
        if (inputs.required) {
          return formik.values[`${inputs.id}`]?.length > 0;
        }

        return null;
      }).length < formInputs.filter((inputs: any) => inputs.required).length;

    // Checks if the formik.errors object has any errors and returns a boolean
    const errors = !!Object.entries(formik.errors).filter(
      ([key, value]) => value && (value as string).length > 0
    ).length;

    // If either of the above statements are true, return true
    if (requireds || errors) {
      return true;
    }
    // Otherwise, return false
    return false;
  };
};
