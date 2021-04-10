import { atom } from "recoil";
import _memoize from "lodash/memoize";

export const filter = _memoize((name: string) =>
  atom({
    key: name,
    default: {
      filter: "",
    },
  })
);
