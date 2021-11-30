import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import "./index.module.css";
import { configureStore } from "./modules";
import { tweetService } from "./modules/tweets/sagas";
import StorageImpl, { AUTH_STORAGE_KEY } from "./util/storage";

const store = configureStore();
const authStorage = new StorageImpl(AUTH_STORAGE_KEY);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App tweetService={tweetService} authStorage={authStorage} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
