import { UserState } from "./types";
import {
  LOGIN,
  loginAsync,
  LOGOUT,
  logoutAsync,
  ME,
  meAsync,
  SIGNUP,
  signupAsync,
} from "./actions";
import { createReducer } from "typesafe-actions";
import { createAsyncReducer } from "../../util/asyncUtils";

// 초기값 설정
const initialState: UserState = {
  loginUser: null,
  isLoading: false,
  errorMessage: null,
};

const loginUser = createReducer<UserState>(initialState, {
  [SIGNUP.SUCCESS]: (state, { payload }) => {
    const { username, profile_url } = payload.data;
    return {
      ...state,
      loginUser: {
        username,
        profile_url,
      },
      isLoading: false,
    };
  },
  [LOGIN.SUCCESS]: (state, { payload }) => {
    const { username, profile_url } = payload.data;
    return {
      ...state,
      loginUser: {
        username,
        profile_url,
      },
      isLoading: false,
    };
  },
  [ME.SUCCESS]: (state, { payload }) => {
    const { username, profile_url } = payload.data;
    return {
      ...state,
      loginUser: {
        username,
        profile_url,
      },
      isLoading: false,
    };
  },
  [LOGOUT.SUCCESS]: (state) => ({
    ...state,
    loginUser: null,
    isLoading: false,
  }),
  ...createAsyncReducer(signupAsync),
  ...createAsyncReducer(meAsync),
  ...createAsyncReducer(loginAsync),
  ...createAsyncReducer(logoutAsync),
});

export default loginUser;
