import createSagaMiddleware from "redux-saga";
import { combineSagas } from "../util/asyncUtils";
import { applyMiddleware, combineReducers, createStore } from "redux";
import loginUser from "./login_user";
import tweets from "./tweets";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  loginUser: loginUser.reducer,
  tweets: tweets.reducer,
});

const rootSagas = combineSagas({
  tweets: tweets.sagas,
  loginUser: loginUser.sagas,
});

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSagas);

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
