import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import "./index.module.css";
import { configureStore } from "./modules";
import { tweetService } from "./modules/tweets/sagas";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App tweetService={tweetService} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
