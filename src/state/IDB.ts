import { atom } from "recoil";
import _memoize from "lodash/memoize";

let defaults: IDBDatabase;

export const IDB = _memoize((name: string) =>
  atom({
    key: name,
    default: defaults,
  })
);
