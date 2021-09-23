import { memo } from "react";
import { useHistory } from "react-router-dom";
import FormBtn from "../../components/form_btn/form_btn";
import styles from "./not_found.module.css";

const NotFound = memo(() => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <section className={styles.container}>
      <img
        src={process.env.PUBLIC_URL + "/img/logo.png"}
        alt="Dwitter logo"
        className={styles.logo}
      />
      <h1>Sorry, page not found ;(</h1>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <FormBtn text="Go back" onClickHandler={goBack} />
        </div>
        <div className={styles.button}>
          <FormBtn text="Go home" onClickHandler={goHome} />
        </div>
      </div>
    </section>
  );
});

export default NotFound;
