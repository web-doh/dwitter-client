import { takeEvery } from "redux-saga/effects";
import { fetchCsrfToken, fetchToken } from "../../hooks/useUser";
import HttpClient from "../../network/http";
import Socket from "../../network/socket";
import TweetService from "../../service/tweets";
import { createAsyncSaga, createSocketSaga } from "../../util/asyncUtils";
import {
  deleteAsync,
  getAsync,
  listenAsync,
  postAsync,
  updateAsync,
} from "./actions";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const socketClient = new Socket(baseURL, () => fetchToken());
export const tweetService = new TweetService({
  baseURL,
  socket: socketClient,
  getCsrfToken: () => fetchCsrfToken(),
  httpConstructor: HttpClient,
});

const asyncGetSaga = createAsyncSaga(getAsync, tweetService.get);
const asyncPostSaga = createAsyncSaga(postAsync, tweetService.post);
const asyncUpdateSaga = createAsyncSaga(updateAsync, tweetService.update);
const asyncDeleteSaga = createAsyncSaga(deleteAsync, tweetService.delete);
const asyncListenSaga = createSocketSaga(listenAsync, socketClient.onSync);

const tweetsSagas = [
  takeEvery(getAsync.request, asyncGetSaga),
  takeEvery(postAsync.request, asyncPostSaga),
  takeEvery(updateAsync.request, asyncUpdateSaga),
  takeEvery(deleteAsync.request, asyncDeleteSaga),
  takeEvery(listenAsync.request, asyncListenSaga),
];

export default tweetsSagas;
