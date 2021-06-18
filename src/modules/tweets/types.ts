import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type TweetAction = ActionType<typeof actions>;

export type tweet = {
  id: number;
  username: string;
  name: string;
  body: string;
  created_at: Date;
  modified_at: Date;
  profile_url?: string;
};

export type TweetState = {
  tweets: Array<tweet>;
  isLoading: boolean;
  errorMessage: string | null;
};
