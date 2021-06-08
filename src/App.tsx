import { Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/header/header";
import useUser from "./hooks/useUser";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

function App() {
  const {
    loginUser: { isLoggined },
  } = useUser();

  return (
    <div className={styles.app}>
      <Header />

      <Switch>
        <Route exact path={["/", "home"]}>
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
