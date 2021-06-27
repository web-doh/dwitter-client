import { IRequest } from "../../service/tweets";
import { createAsyncAction } from "typesafe-actions";
import { AxiosError, AxiosResponse } from "axios";

// action type
export const GET_TWEETS = {
  REQUEST: "tweets/GET_TWEETS_REQUEST",
  SUCCESS: "tweets/GET_TWEETS_SUCCESS",
  FAILURE: "tweets/GET_TWEETS_FAILURE",
};
export const POST_TWEET = {
  REQUEST: "tweets/POST_TWEETS_REQUEST",
  SUCCESS: "tweets/POST_TWEETS_SUCCESS",
  FAILURE: "tweets/POST_TWEETS_FAILURE",
};
export const UPDATE_TWEET = {
  REQUEST: "tweets/UPDATE_TWEETS_REQUEST",
  SUCCESS: "tweets/UPDATE_TWEETS_SUCCESS",
  FAILURE: "tweets/UPDATE_TWEETS_FAILURE",
};
export const DELETE_TWEET = {
  REQUEST: "tweets/DELETE_TWEETS_REQUEST",
  SUCCESS: "tweets/DELETE_TWEETS_SUCCESS",
  FAILURE: "tweets/DELETE_TWEETS_FAILURE",
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
)<IRequest, AxiosResponse, AxiosError>();

export const updateAsync = createAsyncAction(
  UPDATE_TWEET.REQUEST,
  UPDATE_TWEET.SUCCESS,
  UPDATE_TWEET.FAILURE
)<IRequest, AxiosResponse, AxiosError>();

export const deleteAsync = createAsyncAction(
  DELETE_TWEET.REQUEST,
  DELETE_TWEET.SUCCESS,
  DELETE_TWEET.FAILURE
)<string, AxiosResponse, AxiosError>();
