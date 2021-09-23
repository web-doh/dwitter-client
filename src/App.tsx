import { useEffect } from "react";
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

type AppProps = {
  tweetService: TweetService;
};

function App({ tweetService }: AppProps) {
  const { onMe, onCsrfToken } = useUser();
  const loginUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";

  useEffect(() => {
    onCsrfToken();
    onMe();
  }, [useUser]);

  return (
    <div className={styles.app}>
      <Header loginUser={loginUser} />

      <main className={styles.main}>
        <Switch>
          <PrivateRoute
            isAuthenticated={loginUser ? true : false}
            exact
            path={["/", "/home"]}
          >
            <Home loginUser={loginUser} tweetService={tweetService} />
          </PrivateRoute>
          <PrivateRoute
            isAuthenticated={loginUser ? true : false}
            exact
            path={["/history", "/tweets/:username"]}
          >
            <History loginUser={loginUser} tweetService={tweetService} />
          </PrivateRoute>
          <Route exact path="/login">
            {loginUser ? <Redirect to="/" /> : <Login />}
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
