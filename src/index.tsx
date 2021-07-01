import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { Provider } from "react-redux";
import { configureStore } from "./modules";
import { BrowserRouter } from "react-router-dom";
import TokenStorage from "./db/token";

const store = configureStore();
const tokenDB = new TokenStorage();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App tokenDB={tokenDB} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
