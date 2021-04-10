/* eslint-disable */
import React from "react";
import { useRecoilValue } from "recoil";
import { filter } from "../state/filterState";

export function useFilter<T>(
  name: string,
  callback: (filter: string, data: T) => T,
  data: T
) {
  const filterState = useRecoilValue(filter(name));
  const [filteredData, setFilteredData] = React.useState<T>();

  React.useEffect(() => {
    setFilteredData(callback(filterState.filter, data));
  }, [filterState.filter]);

  return {
    filteredData: filteredData ? filteredData : data,
    filter: filterState.filter,
  };
}
