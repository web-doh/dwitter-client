import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules";
import { BrowserRouter } from "react-router-dom";
import TweetService from "./service/tweets";
import { composeWithDevTools } from "redux-devtools-extension";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const tweetService = new TweetService(baseURL);
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App tweetService={tweetService} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
