import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation().pathname;
  const history = useHistory();
  const {
    loginUser: { loginUser },
    onLogout,
  } = useUser();

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
          <h2
            className={`${styles.menu} ${
              (location === "/" || location.includes("/home")) &&
              styles.selected
            }`}
          >
            <Link to="/">Home</Link>
          </h2>

          <h2
            className={`${styles.menu} ${
              location.includes(loginUser.username) && styles.selected
            }`}
          >
            <Link to={`/${loginUser.username}`}>History</Link>
          </h2>
          <button className={styles.button} onClick={logoutHandler}>
            <h2 className={styles.menu}>Logout</h2>
          </button>
        </nav>
      ) : (
        <nav>
          <button className={styles.button} onClick={logoutHandler}>
            <h2 className={`${styles.menu} ${styles.selected}`}>Login</h2>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
