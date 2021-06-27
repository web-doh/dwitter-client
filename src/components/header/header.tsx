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

  useEffect(() => {
    if (location === "/" || location.includes("/home")) {
      setCurrentLocation("home");
    } else if (location.includes("/history")) {
      setCurrentLocation("history");
    } else {
      setCurrentLocation("");
    }
  }, [location]);

  const logoutHandler = () => {
    if (window.confirm("Do you want to log out?")) {
      onLogout();
      history.push("/");
    }
  };
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img
            src="./img/logo.png"
            alt="Dwitter logo"
            className={styles.image}
          />
          <div>
            <h1>Dwitter</h1>
            {loginUser && (
              <span className={styles.username}>@{loginUser.username}</span>
            )}
          </div>
        </div>
      </Link>
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
