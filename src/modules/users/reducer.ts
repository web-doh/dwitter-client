import { UserAction, UserState } from "./types";
import { LOGIN, LOGOUT } from "./actions";
import { createReducer } from "typesafe-actions";

// 초기값 설정
const initialState: UserState = {
  user: {
    id: 1,
    username: "bob",
    name: "Bob",
    profile_url:
      "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  isLoggined: true,
};

const loginUser = createReducer<UserState, UserAction>(initialState, {
  [LOGIN]: (_, { payload: user }) => ({ user, isLoggined: true }),
  [LOGOUT]: () => ({ isLoggined: false }),
});

export default loginUser;
