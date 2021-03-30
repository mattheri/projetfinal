/**
 * Check which inputs has the current row and return it
 * @param currentRow The current row
 * @returns The input which has this row
 */
export const compareRow = (Inputs: JSX.Element[], currentRow: number) =>
  Inputs.filter(
    (inputs) =>
      inputs.props.children[1].props.children.props.row === currentRow + 1 &&
      inputs
  );
