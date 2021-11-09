import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import { SignUpProps } from "../../service/auth";
import { SignUpError, validateSignup } from "../../util/validate";
import FormBtn from "../form_btn/form_btn";
import styles from "./sign-up_form.module.css";

type SignUpFormProps = {
  onSignUp(userInfo: SignUpProps): any;
  isLoading: boolean;
};

const SignUpForm = ({ onSignUp, isLoading }: SignUpFormProps) => {
  const {
    data: userInfo,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    handleSubmitting,
  } = useForm<SignUpProps, SignUpError>({
    initialValues: {
      username: "",
      password1: "",
      password2: "",
      name: "",
      email: "",
      profile_url: "",
    },
    onSubmit: onSignUp,
    validate: validateSignup,
  });
  const { username, password1, password2, name, email, profile_url } = userInfo;

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
        <div className={`${styles.box} ${errors.password1 && styles.errorBox}`}>
          <label
            htmlFor="password1"
            className={password1 ? styles.label : styles.empty}
          >
            password
          </label>
          <input
            type="password"
            className={styles.input}
            id="password1"
            name="password1"
            value={password1}
            required
            onChange={handleChange}
          />
        </div>
        {errors.password1 && (
          <span className={styles.errorMsg}>{errors.password1}</span>
        )}
      </li>
      <li className={styles.item}>
        <div className={`${styles.box} ${errors.password2 && styles.errorBox}`}>
          <label
            htmlFor="password2"
            className={password2 ? styles.label : styles.empty}
          >
            confirm password
          </label>
          <input
            type="password"
            className={styles.input}
            id="password2"
            name="password2"
            value={password2}
            required
            onChange={handleChange}
          />
        </div>
        {errors.password2 && (
          <span className={styles.errorMsg}>{errors.password2}</span>
        )}
      </li>
      <li className={styles.item}>
        <div className={`${styles.box} ${errors.name && styles.errorBox}`}>
          <label htmlFor="name" className={name ? styles.label : styles.empty}>
            name
          </label>
          <input
            type="text"
            className={styles.input}
            id="name"
            name="name"
            value={name}
            required
            onChange={handleChange}
          />
        </div>
        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
      </li>
      <li className={styles.item}>
        <div className={`${styles.box} ${errors.email && styles.errorBox}`}>
          <label
            htmlFor="email"
            className={email ? styles.label : styles.empty}
          >
            email
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            name="email"
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        {errors.email && (
          <span className={styles.errorMsg}>{errors.email}</span>
        )}
      </li>
      <li className={styles.item}>
        <div
          className={`${styles.box} ${errors.profile_url && styles.errorBox}`}
        >
          <label
            htmlFor="profile_url"
            className={profile_url ? styles.label : styles.empty}
          >
            profile image url
          </label>
          <input
            type="text"
            className={styles.input}
            id="profile_url"
            name="profile_url"
            value={profile_url}
            onChange={handleChange}
          />
        </div>
        {errors.profile_url && (
          <span className={styles.errorMsg}>{errors.profile_url}</span>
        )}
      </li>
      <div className={styles.button}>
        <FormBtn text="Register" submitting={submitting} />
      </div>
    </form>
  );
};

export default SignUpForm;
