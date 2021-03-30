/**
 * Adds 1 to the current row
 * @param currentRow The current row, will always start at 0
 * @param columnTotal The total column span for that row
 * @returns If the total column span exceeds 12, increment the row by 1, otherwise, stay at the same row.
 */
export const addRow = (currentRow: number = 1, columnTotal: number) => {
  if (columnTotal >= 12) {
    return currentRow++;
  }

  return currentRow;
};
