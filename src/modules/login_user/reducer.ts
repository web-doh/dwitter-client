import { UserState } from "./types";
import { IResponse, LOGIN, loginAsync, LOGOUT } from "./actions";
import { createReducer } from "typesafe-actions";
import { createAsyncReducer } from "../../util/asyncUtils";

// 초기값 설정
const initialState: UserState = {
  loginUser: null,
  isLoggined: false,
  isLoading: false,
  errorMessage: null,
};

const loginUser = createReducer<UserState>(initialState, {
  [LOGIN.SUCCESS]: (state, { payload }) => {
    const loginUser = (payload as IResponse).data;
    return {
      ...state,
      loginUser,
      isLoggined: true,
      isLoading: false,
    };
  },
  [LOGOUT]: (state) => ({
    ...state,
    loginUser: null,
    isLoggined: false,
    isLoading: false,
  }),
  ...createAsyncReducer(loginAsync),
});

export default loginUser;
