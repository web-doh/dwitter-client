import { SignUpProps, LoginProps } from "../service/auth";

export type SignUpError = {
  username?: string;
  name?: string;
  password?: string;
  password1?: string;
  password2?: string;
  email?: string;
  profile_url?: string;
};

export type LoginError = {
  username?: string;
  password?: string;
};

export type ValidateError = SignUpError | LoginError;

export function validateSignup({
  username,
  name,
  password1,
  password2,
  email,
  profile_url,
}: SignUpProps): SignUpError {
  const errors: SignUpError = {};

  if (!username) {
    errors.username = "Please enter your name.";
  } else if (!/\w{3,}/.test(username)) {
    errors.username = "Username should be at least 3 characters";
  }

  if (!name) {
    errors.name = "Please enter your name.";
  }

  if (!password1) {
    errors.password1 = "Please enter your password.";
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password1)) {
    errors.password1 =
      "Please enter at least 6 characters including English and numbers.";
  }

  if (!password2) {
    errors.password2 = "Please enter your password again.";
  } else if (password1 !== password2) {
    errors.password2 = "Passwords do not match.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "This email address is malformed.";
  }

  if (profile_url && !/^(ftp|http|https):\/\/[^ "]+$/.test(profile_url)) {
    errors.profile_url = "This url is malformed.";
  }

  return errors;
}

export function validateLogin({ username, password }: LoginProps): LoginError {
  const errors: LoginError = {};

  if (!username) {
    errors.username = "Please enter your name.";
  } else if (!/\w{3,}/.test(username)) {
    errors.username = "Username should be at least 3 characters";
  }

  if (!password) {
    errors.password = "Please enter your password.";
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
    errors.password =
      "Please enter at least 6 characters including English and numbers.";
  }

  return errors;
}
