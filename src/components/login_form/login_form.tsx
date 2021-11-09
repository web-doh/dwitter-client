import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import { LoginProps } from "../../service/auth";
import { LoginError, validateLogin } from "../../util/validate";
import FormBtn from "../form_btn/form_btn";
import styles from "./login_form.module.css";

type LoginFormProps = {
  onLogin(userInfo: LoginProps): any;
  isLoading: boolean;
};

const LoginForm = ({ onLogin, isLoading }: LoginFormProps) => {
  const {
    data: userInfo,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    handleSubmitting,
  } = useForm<LoginProps, LoginError>({
    initialValues: { username: "", password: "" },
    onSubmit: onLogin,
    validate: validateLogin,
  });
  const { username, password } = userInfo;

  useEffect(() => {
    handleSubmitting(isLoading);
  }, [isLoading]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <li className={styles.item}>
        <div className={`${styles.box} ${errors.username && styles.errorBox}`}>
          <label
            htmlFor="username"
            className={username ? styles.label : styles.empty}
          >
            ID
          </label>
          <input
            type="text"
            className={styles.input}
            id="username"
            name="username"
            value={username}
            required
            onChange={handleChange}
          />
        </div>
        {errors.username && (
          <span className={styles.errorMsg}>{errors.username}</span>
        )}
      </li>
      <li className={styles.item}>
        <div className={`${styles.box} ${errors.password && styles.errorBox}`}>
          <label
            htmlFor="password"
            className={password ? styles.label : styles.empty}
          >
            password
          </label>
          <input
            type="password"
            className={styles.input}
            id="password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        {errors.password && (
          <span className={styles.errorMsg}>{errors.password}</span>
        )}
      </li>
      <div className={styles.button}>
        <FormBtn text="Login" submitting={submitting} />
      </div>
    </form>
  );
};

export default LoginForm;
