import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import styles from "./app.module.css";
import Header from "./components/header/header";
import useUser from "./hooks/useUser";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NotFound from "./pages/not_found/not_found";
import PrivateRoute from "./routes/private_route";
import TweetService from "./service/tweets";
import StorageImpl from "./util/storage";

type AppProps = {
  tweetService: TweetService;
  authStorage: StorageImpl;
};

function App({ tweetService, authStorage }: AppProps) {
  const [isAuthenticated, _] = useState(() => authStorage.getItem() === "true");
  const { onMe, onCsrfToken } = useUser();

  useEffect(() => {
    onCsrfToken();
  }, [useUser]);

  useEffect(() => {
    isAuthenticated && onMe();
  }, [useUser]);

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <Switch>
          <PrivateRoute
            exact
            path={["/", "/home", "/tweets"]}
            isAuthenticated={isAuthenticated}
          >
            <Home tweetService={tweetService} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path={["/history", "/tweets/:username"]}
            isAuthenticated={isAuthenticated}
          >
            <History tweetService={tweetService} />
          </PrivateRoute>
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path={["*", "/not-found"]}>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
