import { csrfAsync } from "./../modules/login_user/actions";
import { LoginProps, SignUpProps } from "./../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import {
  loginAsync,
  logoutAsync,
  meAsync,
  signupAsync,
} from "../modules/login_user/actions";
import { createRef, useImperativeHandle } from "react";

const csrfRef = createRef();

export default function useUser() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  useImperativeHandle(csrfRef, () => loginUser.csrfToken);

  const onSignup = (userInfo: SignUpProps) =>
    dispatch(signupAsync.request(userInfo));
  const onLogin = (userInfo: LoginProps) =>
    dispatch(loginAsync.request(userInfo));
  const onLogout = () => dispatch(logoutAsync.request(undefined));
  const onMe = () => dispatch(meAsync.request(undefined));
  const onCsrfToken = () => dispatch(csrfAsync.request(undefined));

  return { loginUser, onSignup, onLogin, onLogout, onMe, onCsrfToken };
}

export const fetchCsrfToken = () => csrfRef.current;
