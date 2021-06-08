import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
