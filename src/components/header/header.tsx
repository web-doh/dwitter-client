import { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import styles from "./header.module.css";

const Header = () => {
  const history = useHistory();
  const location = useLocation().pathname;
  const [currentLocation, setCurrentLocation] = useState("");
  const {
    loginUser: { loginUser },
    onLogout,
  } = useUser();
  const username = loginUser?.username;

  useEffect(() => {
    if (location === "/" || location.includes("/home")) {
      setCurrentLocation("home");
    } else if (
      location.includes("/history") ||
      location === `/tweets/${username}`
    ) {
      setCurrentLocation("history");
    } else {
      setCurrentLocation("");
    }
  }, [location, username]);

  const logoutHandler = () => {
    if (window.confirm("Do you want to log out?")) {
      onLogout();
      history.push("/");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="./img/logo.png"
            alt="Dwitter logo"
            className={styles.image}
          />
        </Link>
        <div>
          <Link to="/">
            <h1>Dwitter</h1>
          </Link>

          {loginUser && (
            <Link to={`/tweets/${username}`}>
              <span className={styles.username}>@{username}</span>
            </Link>
          )}
        </div>
      </div>

      {loginUser ? (
        <nav className={styles.nav}>
          <Link to="/">
            <h2
              className={`${styles.menu} ${
                currentLocation === "home" && styles.selected
              }`}
            >
              Home
            </h2>
          </Link>
          <Link to="/history">
            <h2
              className={`${styles.menu} ${
                currentLocation === "history" && styles.selected
              }`}
            >
              History
            </h2>
          </Link>
          <button className={styles.button} onClick={logoutHandler}>
            <h2 className={styles.menu}>Logout</h2>
          </button>
        </nav>
      ) : (
        <nav>
          <Link to="/login">
            <h2 className={`${styles.menu} ${styles.selected}`}>Login</h2>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
