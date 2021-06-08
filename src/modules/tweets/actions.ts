import { createAction } from "typesafe-actions";
import { user } from "../users";
import { tweet } from "./types";

// action type
export const SET_TWEETS = "tweets/SET_TWEETS";
export const ADD_TWEET = "tweets/ADD_TWEET";
export const UPDATE_TWEET = "tweets/UPDATE_TWEET";
export const REMOVE_TWEET = "tweets/REMOVE_TWEET";

// action 생성 함수
export const setTweets = createAction(SET_TWEETS)();
export const addTweet = createAction(ADD_TWEET)<{ body: string; user: user }>();
export const updateTweet = createAction(UPDATE_TWEET)<tweet>();
export const removeTweet = createAction(REMOVE_TWEET)<number>();
