import { getAsync, postAsync, updateAsync, deleteAsync } from "./actions";
import { takeEvery } from "@redux-saga/core/effects";
import TweetService from "../../service/tweets";
import TokenStorage from "../../db/token";
import { createAsyncSaga } from "../../util/asyncUtils";
import HttpClient from "../../network/http";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const tweetService = new TweetService({
  baseURL,
  httpConstructor: HttpClient,
  tokenStorageConstructor: TokenStorage,
});

const asyncGetSaga = createAsyncSaga(getAsync, tweetService.get);
const asyncPostSaga = createAsyncSaga(postAsync, tweetService.post);
const asyncUpdateSaga = createAsyncSaga(updateAsync, tweetService.update);
const asyncDeleteSaga = createAsyncSaga(deleteAsync, tweetService.delete);

const tweetsSagas = [
  takeEvery(getAsync.request, asyncGetSaga),
  takeEvery(postAsync.request, asyncPostSaga),
  takeEvery(updateAsync.request, asyncUpdateSaga),
  takeEvery(deleteAsync.request, asyncDeleteSaga),
];

export default tweetsSagas;
