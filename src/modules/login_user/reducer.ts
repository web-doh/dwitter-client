import { createReducer } from "typesafe-actions";

import { UserAction, UserState } from "./types";
import {
  LOGIN,
  loginAsync,
  LOGOUT,
  logoutAsync,
  ME,
  meAsync,
  SIGNUP,
  signupAsync,
  CSRF,
  csrfAsync,
} from "./actions";
import { createAsyncReducer } from "../../util/asyncUtils";

// 초기값 설정
const initialState: UserState = {
  loginUser: null,
  isLoading: false,
  errorMessage: null,
  csrfToken: null,
};

const loginUser = createReducer<UserState, UserAction>(initialState, {
  [SIGNUP.SUCCESS]: (state, { payload }) => {
    const { username, profile_url, token } = payload.data;
    return {
      ...state,
      loginUser: {
        username,
        token,
        profile_url,
      },
      isLoading: false,
    };
  },
  [LOGIN.SUCCESS]: (state, { payload }) => {
    const { username, profile_url, token } = payload.data;
    return {
      ...state,
      loginUser: {
        username,
        token,
        profile_url,
      },
      isLoading: false,
    };
  },
  [ME.SUCCESS]: (state, { payload }) => {
    const { username, profile_url, token } = payload.data;
    return {
      ...state,
      loginUser: {
        username,
        token,
        profile_url,
      },
      isLoading: false,
    };
  },
  [LOGOUT.SUCCESS]: (state) => ({
    ...state,
    loginUser: null,
    isLoading: false,
    csrfToken: null,
    token: null,
  }),
  [CSRF.SUCCESS]: (state, { payload }) => {
    const { csrfToken } = payload.data;
    return {
      ...state,
      isLoading: false,
      csrfToken,
    };
  },

  ...createAsyncReducer(signupAsync),
  ...createAsyncReducer(meAsync),
  ...createAsyncReducer(loginAsync),
  ...createAsyncReducer(logoutAsync),
  ...createAsyncReducer(csrfAsync),
});

export default loginUser;
