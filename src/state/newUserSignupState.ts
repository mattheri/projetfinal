import { atom } from "recoil";
import { Student, Enterprise } from "../react-app-env";

type StudentState = Omit<Student, "_id">;
type EnterpriseState = Omit<Enterprise, "_id">;

type UserSignUpType =
  | ({
      type: "etudiant" | string;
    } & Partial<StudentState>)
  | ({
      type: "entreprise" | string;
    } & Partial<EnterpriseState>);

const defaultState: UserSignUpType = {
  type: "",
};

export const newUserSignupState = atom({
  key: "newUserSignupState",
  default: defaultState,
});
