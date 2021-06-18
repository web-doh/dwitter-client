import {
  IResponse,
  DELETE_TWEET,
  GET_TWEETS,
  POST_TWEET,
  UPDATE_TWEET,
  getAsync,
  postAsync,
  updateAsync,
  deleteAsync,
} from "./actions";
import { createReducer } from "typesafe-actions";
import { tweet, TweetAction, TweetState } from "./types";
import { createAsyncReducer } from "../../util/asyncUtils";

// 초기값 설정
const initialState: TweetState = {
  tweets: [],
  isLoading: false,
  errorMessage: null,
};

const tweetsReducer = createReducer<TweetState, TweetAction>(initialState, {
  [GET_TWEETS.SUCCESS]: (state, { payload }) => {
    const tweets = (payload as IResponse).data as Array<tweet>;
    return {
      ...state,
      tweets,
      isLoading: false,
    };
  },
  [POST_TWEET.SUCCESS]: (state, { payload }) => {
    const tweet = (payload as IResponse).data as tweet;
    return {
      ...state,
      tweets: state.tweets.concat(tweet),
      isLoading: false,
    };
  },
  [UPDATE_TWEET.SUCCESS]: (state, { payload }) => {
    const updated = (payload as IResponse).data as tweet;
    const id = updated.id;
    return {
      ...state,
      tweets: state.tweets.map((tweet) => {
        if (tweet.id === id) {
          return updated;
        }
        return tweet;
      }),
      isLoading: false,
    };
  },
  [DELETE_TWEET.SUCCESS]: (state, { payload }) => {
    const deleted = (payload as IResponse).data as number;
    return {
      ...state,
      tweets: state.tweets.filter((tweet) => tweet.id !== deleted),
      isLoading: false,
    };
  },
  ...createAsyncReducer(getAsync),
  ...createAsyncReducer(postAsync),
  ...createAsyncReducer(updateAsync),
  ...createAsyncReducer(deleteAsync),
});

export default tweetsReducer;
