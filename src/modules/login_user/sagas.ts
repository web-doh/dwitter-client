import { takeEvery } from "@redux-saga/core/effects";
import TokenStorage from "../../db/token";
import AuthService from "../../service/auth";
import { createAsyncSaga } from "../../util/asyncUtils";
import HttpClient from "../../util/httpNetwork";
import { signupAsync, loginAsync, logoutAsync, meAsync } from "./actions";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const authService = new AuthService({
  baseURL,
  httpConstructor: HttpClient,
  tokenStorageConstructor: TokenStorage,
});

const asyncSignupSaga = createAsyncSaga(signupAsync, authService.signup);
const asyncLoginSaga = createAsyncSaga(loginAsync, authService.login);
const asyncLogoutSaga = createAsyncSaga(logoutAsync, authService.logout);
const asyncMeSaga = createAsyncSaga(meAsync, authService.me);

const loginUserSagas = [
  takeEvery(signupAsync.request, asyncSignupSaga),
  takeEvery(loginAsync.request, asyncLoginSaga),
  takeEvery(logoutAsync.request, asyncLogoutSaga),
  takeEvery(meAsync.request, asyncMeSaga),
];

export default loginUserSagas;
