/**
 * Adds the current span amount with the previous span amount together
 * @param column The current span amount
 * @param previous The previous span amount
 * @returns If the previous span amount exists, adds the previous span amount to the current, otherwise, return the current span amount
 */
export const addColumns = (column: number, previous?: number) => {
  if (previous) {
    return (column += previous);
  }

  return column;
};
