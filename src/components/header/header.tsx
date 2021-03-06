import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import useUser from "../../hooks/useUser";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const {
    loginUser: { loginUser },
    onLogout,
  } = useUser();
  const username = loginUser?.username;

  const logoutHandler = () => {
    if (window.confirm("Do you want to log out?")) {
      onLogout();
      history.push("/login");
    }
  };

  const forceUpdate = () => {
    history.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          alt="Dwitter logo"
          className={styles.image}
          onClick={forceUpdate}
        />
        <div>
          <h1 onClick={forceUpdate}>Dwitter</h1>

          {loginUser && (
            <Link to={`/tweets/${username}`}>
              <span className={styles.username}>@{username}</span>
            </Link>
          )}
        </div>
      </div>

      {loginUser ? (
        <nav className={styles.nav}>
          <NavLink
            to="/"
            activeClassName={styles.selected}
            isActive={() => {
              return path === "/" || path.includes("/home");
            }}
          >
            <h2 className={styles.menu}>Home</h2>
          </NavLink>
          <NavLink
            to="/history"
            activeClassName={styles.selected}
            isActive={() => {
              return (
                path.includes("/history") || path === `/tweets/${username}`
              );
            }}
          >
            <h2 className={styles.menu}>History</h2>
          </NavLink>
          <button className={styles.button} onClick={logoutHandler}>
            <h2 className={styles.menu}>Logout</h2>
          </button>
        </nav>
      ) : (
        <nav>
          <NavLink to="/login" exact activeClassName={styles.selected}>
            <h2 className={`${styles.menu} ${styles.selected}`}>Login</h2>
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
