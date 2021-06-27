import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/header/header";
import useUser from "./hooks/useUser";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

function App() {
  const {
    loginUser: { loginUser },
    onLogin,
    onMe,
  } = useUser();

  useEffect(() => {
    onMe();
  }, [loginUser?.username]);

  useEffect(() => {
    onLogin({
      username: "bob",
      password: "abcd1234",
    });
  }, []);

  return (
    <div className={styles.app}>
      <Header />

      {loginUser ? (
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path={["/history", "/:username"]}>
            <History loginUser={loginUser.username} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
