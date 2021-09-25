import { useEffect, useState } from "react";

import useUser from "../../hooks/useUser";
import LoginForm from "../../components/login_form/login_form";
import styles from "./login.module.css";
import SignUpForm from "../../components/sign-up_form/sign-up_form";
import ErrorBanner from "../../components/error_banner/error_banner";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const {
    loginUser: { errorMessage, isLoading },
    onLogin,
    onSignup,
  } = useUser();

  useEffect(() => {
    if (errorMessage) {
      if (
        errorMessage === "Authentication Error" ||
        errorMessage === "Something wrong!"
      )
        return;
      onError(errorMessage);
    }
  }, [errorMessage]);

  const onChangeMode = () => {
    if (mode === "login") {
      setMode("signup");
    } else if (mode === "signup") {
      setMode("login");
    }
  };

  const onError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {error && <ErrorBanner message={error} />}
      {mode === "login" && (
        <section className={styles.container}>
          <LoginForm onLogin={onLogin} isLoading={isLoading} />
          <div className={styles.option}>
            <p>Don't have an account?</p>
            <button className={styles.button} onClick={onChangeMode}>
              Sign Up
            </button>
          </div>
        </section>
      )}
      {mode === "signup" && (
        <section className={styles.container}>
          <SignUpForm onSignUp={onSignup} isLoading={isLoading} />
          <div className={styles.option}>
            <p>Already have an account?</p>
            <button className={styles.button} onClick={onChangeMode}>
              Login
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
