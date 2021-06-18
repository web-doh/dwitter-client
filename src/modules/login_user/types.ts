import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>;

export type user = {
  username: string;
  token: string;
};

export type UserState = {
  loginUser: user | null;
  isLoggined: boolean;
  isLoading: boolean;
  errorMessage: string | null;
};
