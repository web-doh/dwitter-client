import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { Provider } from "react-redux";
import { configureStore } from "./modules";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
