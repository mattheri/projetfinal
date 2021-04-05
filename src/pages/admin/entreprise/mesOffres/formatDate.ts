import { DateTime } from "luxon";

/**
 * Checks if the key is either dateDebut or dateFin and format the date.
 * Otherwise, it returns the value as is.
 * @param key Object key
 * @param value Value of the key
 * @returns Either the date formatted or the value as is.
 */
export const formatDate = (key: string, value: string) => {
  if (key === "dateDebut" || key === "dateFin") {
    return DateTime.fromISO(value).toLocaleString();
  }

  return value;
};
