import { takeEvery } from "@redux-saga/core/effects";
import AuthService from "../../service/auth";
import { createAsyncSaga } from "../../util/asyncUtils";
import { loginAsync } from "./actions";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const authService = new AuthService(baseURL);

const asyncLoginSaga = createAsyncSaga(loginAsync, authService.login);

const loginUserSagas = [takeEvery(loginAsync.request, asyncLoginSaga)];

export default loginUserSagas;
