import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>;
export type LoginAction = ActionType<typeof actions>;

export type user = {
  id: number;
  username: string;
  name: string;
  profile_url?: string;
};

export type UserState = {
  user?: user;
  isLoggined: boolean;
};
