import { createAsyncAction } from "typesafe-actions";
import { AxiosError, AxiosResponse } from "axios";

import { PostProps, UpdateProps } from "../../service/tweets";

// action type
export const GET_TWEETS = {
  REQUEST: "tweets/GET_TWEETS_REQUEST",
  SUCCESS: "tweets/GET_TWEETS_SUCCESS",
  FAILURE: "tweets/GET_TWEETS_FAILURE",
};
export const POST_TWEET = {
  REQUEST: "tweets/POST_TWEET_REQUEST",
  SUCCESS: "tweets/POST_TWEET_SUCCESS",
  FAILURE: "tweets/POST_TWEET_FAILURE",
};
export const UPDATE_TWEET = {
  REQUEST: "tweets/UPDATE_TWEET_REQUEST",
  SUCCESS: "tweets/UPDATE_TWEET_SUCCESS",
  FAILURE: "tweets/UPDATE_TWEET_FAILURE",
};
export const DELETE_TWEET = {
  REQUEST: "tweets/DELETE_TWEET_REQUEST",
  SUCCESS: "tweets/DELETE_TWEET_SUCCESS",
  FAILURE: "tweets/DELETE_TWEET_FAILURE",
};

export const LISTEN_TWEET = {
  REQUEST: "tweets/LISTEN_TWEET_REQUEST",
  SUCCESS: "tweets/LISTEN_TWEET_SUCCESS",
  FAILURE: "tweets/LISTEN_TWEET_FAILURE",
};

// action 비동기 생성 함수
export const getAsync = createAsyncAction(
  GET_TWEETS.REQUEST,
  GET_TWEETS.SUCCESS,
  GET_TWEETS.FAILURE
)<string, AxiosResponse, AxiosError>();

export const postAsync = createAsyncAction(
  POST_TWEET.REQUEST,
  POST_TWEET.SUCCESS,
  POST_TWEET.FAILURE
)<PostProps, AxiosResponse, AxiosError>();

export const updateAsync = createAsyncAction(
  UPDATE_TWEET.REQUEST,
  UPDATE_TWEET.SUCCESS,
  UPDATE_TWEET.FAILURE
)<UpdateProps, AxiosResponse, AxiosError>();

export const deleteAsync = createAsyncAction(
  DELETE_TWEET.REQUEST,
  DELETE_TWEET.SUCCESS,
  DELETE_TWEET.FAILURE
)<number, AxiosResponse, AxiosError>();

export const listenAsync = createAsyncAction(
  LISTEN_TWEET.REQUEST,
  LISTEN_TWEET.SUCCESS,
  LISTEN_TWEET.FAILURE
)<string, AxiosResponse, AxiosError>();
