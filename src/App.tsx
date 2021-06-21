import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
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
  } = useUser();

  useEffect(() => {
    onLogin({
      username: "alice",
      password: "bob1234",
    });
  }, [useUser, loginUser?.username]);

  return (
    <div className={styles.app}>
      <Header />

      {loginUser ? (
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path={"/:username"}>
            <History />
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
