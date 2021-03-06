import { takeEvery } from "@redux-saga/core/effects";

import { fetchCsrfToken } from "../../hooks/useUser";
import HttpClient from "../../network/http";
import AuthService from "../../service/auth";
import { createAsyncSaga } from "../../util/asyncUtils";
import StorageImpl from "../../util/storage";

import {
  signupAsync,
  loginAsync,
  logoutAsync,
  meAsync,
  csrfAsync,
} from "./actions";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const authService = new AuthService({
  baseURL,
  getCsrfToken: () => fetchCsrfToken(),
  authStorageConstructor: StorageImpl,
  httpConstructor: HttpClient,
});

function loginSuccessHandler() {
  window.location.href = "/";
}

function logoutSuccessHandler() {
  window.location.reload();
}

const asyncSignupSaga = createAsyncSaga(
  signupAsync,
  authService.signup,
  loginSuccessHandler
);
const asyncLoginSaga = createAsyncSaga(
  loginAsync,
  authService.login,
  loginSuccessHandler
);
const asyncLogoutSaga = createAsyncSaga(
  logoutAsync,
  authService.logout,
  logoutSuccessHandler
);
const asyncMeSaga = createAsyncSaga(meAsync, authService.me);
const asyncCSRFSaga = createAsyncSaga(csrfAsync, authService.csrfToken);

const loginUserSagas = [
  takeEvery(signupAsync.request, asyncSignupSaga),
  takeEvery(loginAsync.request, asyncLoginSaga),
  takeEvery(logoutAsync.request, asyncLogoutSaga),
  takeEvery(meAsync.request, asyncMeSaga),
  takeEvery(csrfAsync.request, asyncCSRFSaga),
];

export default loginUserSagas;
