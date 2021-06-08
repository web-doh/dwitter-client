import { TweetAction, TweetState } from "./types";
import { ADD_TWEET, SET_TWEETS, REMOVE_TWEET, UPDATE_TWEET } from "./actions";
import { createReducer } from "typesafe-actions";

// 초기값 설정
const initialState: TweetState = [
  {
    id: 1,
    author: "bob",
    body: "드림코딩에서 강의 들으면 너무 좋으다",
    created_at: new Date("2021-05-09T04:20:57.000Z"),
    modified_at: new Date("2021-05-11T04:20:57.000Z"),
    profile_url:
      "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: 2,
    author: "alice",
    body: "안녕!",
    created_at: new Date("2021-06-02T04:20:57.000Z"),
    modified_at: new Date("2021-06-02T04:20:57.000Z"),
    profile_url:
      "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
  },
  {
    id: 3,
    author: "bob",
    body: "주말!",
    created_at: new Date("2021-06-03T04:20:57.000Z"),
    modified_at: new Date("2021-06-04T04:20:57.000Z"),
    profile_url:
      "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: 4,
    author: "haribo",
    body: "오늘도 좋은 하루!",
    created_at: new Date("2021-06-04T10:20:57.000Z"),
    modified_at: new Date("2021-06-04T10:20:57.000Z"),
    profile_url:
      "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png",
  },
  {
    id: 5,
    author: "haribo",
    body: "젤리좋아",
    created_at: new Date("2021-06-04T20:20:57.000Z"),
    modified_at: new Date("2021-06-04T20:20:57.000Z"),
    profile_url:
      "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png",
  },
];

const tweets = createReducer<TweetState, TweetAction>(initialState, {
  [SET_TWEETS]: (state) => [...state],
  [ADD_TWEET]: (state, { payload: { body, user } }) =>
    state.concat({
      id: Math.max(...state.map((tweet) => tweet.id)) + 1,
      body,
      author: user.username,
      created_at: new Date(Date.now()),
      modified_at: new Date(Date.now()),
      profile_url: user.profile_url,
    }),
  [UPDATE_TWEET]: (state, { payload: { body, id } }) =>
    state.map((tweet) => (tweet.id === id ? { ...tweet, body } : tweet)),
  [REMOVE_TWEET]: (state, { payload: id }) =>
    state.filter((tweet) => tweet.id !== id),
});

export default tweets;
