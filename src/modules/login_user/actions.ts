import { AxiosError, AxiosResponse } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { LoginProps, SignUpProps } from "./../../service/auth";

// action type
export const SIGNUP = {
  REQUEST: "loginUser/SIGNUP_REQUEST",
  SUCCESS: "loginUser/LSIGNUPSUCCESS",
  FAILURE: "loginUser/SIGNUP_FAILURE",
};
export const LOGIN = {
  REQUEST: "loginUser/LOGIN_REQUEST",
  SUCCESS: "loginUser/LOGIN_SUCCESS",
  FAILURE: "loginUser/LOGIN_FAILURE",
};
export const ME = {
  REQUEST: "loginUser/ME_REQUEST",
  SUCCESS: "loginUser/ME_SUCCESS",
  FAILURE: "loginUser/ME_FAILURE",
};
export const LOGOUT = {
  REQUEST: "loginUser/LOGOUT_REQUEST",
  SUCCESS: "loginUser/LOGOUT_SUCCESS",
  FAILURE: "loginUser/LOGOUT_FAILURE",
};

export const CSRF = {
  REQUEST: "loginUser/CSRF_REQUEST",
  SUCCESS: "loginUser/CSRF_SUCCESS",
  FAILURE: "loginUser/CSRF_FAILURE",
};

// action 비동기 생성 함수
export const signupAsync = createAsyncAction(
  SIGNUP.REQUEST,
  SIGNUP.SUCCESS,
  SIGNUP.FAILURE
)<SignUpProps, AxiosResponse, AxiosError>();

export const loginAsync = createAsyncAction(
  LOGIN.REQUEST,
  LOGIN.SUCCESS,
  LOGIN.FAILURE
)<LoginProps, AxiosResponse, AxiosError>();

export const meAsync = createAsyncAction(ME.REQUEST, ME.SUCCESS, ME.FAILURE)<
  any,
  AxiosResponse,
  AxiosError
>();

export const logoutAsync = createAsyncAction(
  LOGOUT.REQUEST,
  LOGOUT.SUCCESS,
  LOGOUT.FAILURE
)<any, any, any>();

export const csrfAsync = createAsyncAction(
  CSRF.REQUEST,
  CSRF.SUCCESS,
  CSRF.FAILURE
)<any, AxiosResponse, AxiosError>();
