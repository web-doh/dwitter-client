import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>;

export type user = {
  username: string;
  profile_url?: string;
};

export type UserState = {
  loginUser: user | null;
  isLoading: boolean;
  errorMessage: string | null;
  csrfToken: string | null;
};
