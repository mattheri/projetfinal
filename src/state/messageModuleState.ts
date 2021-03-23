import { atom } from "recoil";
import _memoize from "lodash/memoize";
import { Enterprise, Message, OffreStage, Student } from "../react-app-env";

type MessageModuleDefaultState = {
  studentSelected?: Student;
  enterpriseSelected?: Enterprise;
  offerSelected?: OffreStage;
  messages?: Message[];
};

const defaults: MessageModuleDefaultState = {};

export const messageModuleState = _memoize((name: string) =>
  atom({
    key: name,
    default: defaults,
  })
);
