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
    const newUser = payload.data;
    return {
      ...state,
      loginUser: newUser,
      isLoading: false,
    };
  },
  [LOGIN.SUCCESS]: (state, { payload }) => {
    const loginUser = payload.data;
    return {
      ...state,
      loginUser,
      isLoading: false,
    };
  },
  [ME.SUCCESS]: (state, { payload }) => {
    const loginUser = payload.data;
    return {
      ...state,
      loginUser,
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
