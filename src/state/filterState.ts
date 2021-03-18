import { atom } from "recoil";
import _memoize from "lodash/memoize";

const defaults = {
  data: [],
  filter: "",
};

export const filter = _memoize((name: string) =>
  atom({
    key: name,
    default: {
      filter: "",
    },
  })
);
