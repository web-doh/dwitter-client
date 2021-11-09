import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import styles from "./app.module.css";
import Header from "./components/header/header";
import LoadingSpinner from "./components/loading_spinner/loading_spinner";
import useUser from "./hooks/useUser";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NotFound from "./pages/not_found/not_found";
import PrivateRoute from "./routes/private_route";
import TweetService from "./service/tweets";

type AppProps = {
  tweetService: TweetService;
};

function App({ tweetService }: AppProps) {
  const [isAuthenticated, _] = useState(() =>
    localStorage.getItem("isAuthenticated") ? true : false
  );
  const {
    loginUser: { isLoading },
    onMe,
    onCsrfToken,
  } = useUser();

  useEffect(() => {
    onCsrfToken();
  }, [useUser]);

  useEffect(() => {
    onMe();
  }, [useUser]);

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.info}>
            <LoadingSpinner size="5rem" />
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
}

export default App;
