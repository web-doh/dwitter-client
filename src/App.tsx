import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/header/header";
import useTweets from "./hooks/useTweets";
import useUser from "./hooks/useUser";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

function App() {
  const {
    loginUser: { isLoggined },
    onLogin,
  } = useUser();

  const { onGetTweets } = useTweets();

  useEffect(() => {
    onGetTweets();
    onLogin({
      username: "alice",
      password: "bob1234",
    });
  }, [isLoggined]);

  return (
    <div className={styles.app}>
      <Header />

      <Switch>
        <Route exact path={["/", "home"]}>
          <Home />
          {isLoggined ? <Home /> : <Login />}
        </Route>
        <Route exact path="/:username">
          <History />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
