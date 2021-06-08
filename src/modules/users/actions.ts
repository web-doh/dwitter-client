import { createAction } from "typesafe-actions";
import { user } from "./types";

// action type
export const LOGIN = "users/LOGIN_USER";
export const LOGOUT = "users/LOGOUT_USER";

// action 생성 함수
export const login = createAction(LOGIN)<user>();
export const logout = createAction(LOGOUT)();
