import { IForm } from "react-app-env";

/**
 * Check the span amount and return it
 */
export const column = (input: IForm) => {
  if (input && input.span) {
    const keys = Object.keys(input.span);
    return (input.span as any)[keys[keys.length - 1]] as number;
  }
  return 12;
};
