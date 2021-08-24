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

function App() {
  const {
    loginUser: { loginUser },
    onMe,
    onCsrfToken,
  } = useUser();

  useEffect(() => {
    onCsrfToken();
  }, [useUser]);

  useEffect(() => {
    if (!loginUser) return;

    onMe();
  }, [useUser]);

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <Switch>
          <PrivateRoute
            exact
            path={["/", "/home"]}
            isAuthenticated={loginUser ? true : false}
          >
            <Home />
          </PrivateRoute>
          <PrivateRoute
            exact
            path={["/history", "/tweets/:username"]}
            isAuthenticated={loginUser ? true : false}
          >
            <History loginUser={loginUser?.username || ""} />
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
