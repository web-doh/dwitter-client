import { combineReducers } from "redux";
import loginUser from "./users";
import tweets from "./tweets";

const rootReducer = combineReducers({
  loginUser,
  tweets,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
