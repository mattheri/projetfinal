import { atom } from "recoil";
import { User } from "../react-app-env";

type AppState = {
  connected: boolean;
  user: User | null;
};

const defaultState: AppState = {
  connected: false,
  user: null,
};

export const appState = atom({
  key: "appState",
  default: defaultState,
});
