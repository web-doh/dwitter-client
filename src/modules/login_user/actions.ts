import { createAction, createAsyncAction } from "typesafe-actions";
import { IRequest } from "../../service/auth";
import { user } from "./types";

// action type
export const LOGIN = {
  REQUEST: "loginUser/LOGIN_REQUEST",
  SUCCESS: "loginUser/LOGIN_SUCCESS",
  FAILURE: "loginUser/LOGIN_FAILURE",
};
export const LOGOUT = "loginUser/LOGOUT";

// action arg type
export interface IResponse {
  status: string;
  data: user;
}

export interface IError {
  message: string;
}

// action 비동기 생성 함수
export const loginAsync = createAsyncAction(
  LOGIN.REQUEST,
  LOGIN.SUCCESS,
  LOGIN.FAILURE
)<IRequest, IResponse, IError>();

export const logout = createAction(LOGOUT)();
