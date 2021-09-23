import { createRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";

import { csrfAsync } from "./../modules/login_user/actions";
import { LoginProps, SignUpProps } from "./../service/auth";
import { RootState } from "../modules";
import {
  loginAsync,
  logoutAsync,
  meAsync,
  signupAsync,
} from "../modules/login_user/actions";

const tokenRef = createRef();
const csrfRef = createRef();

export default function useUser() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  useImperativeHandle(csrfRef, () => loginUser.csrfToken);
  useImperativeHandle(tokenRef, () => loginUser.loginUser?.token);

  const onSignup = (userInfo: SignUpProps) =>
    dispatch(signupAsync.request(userInfo));
  const onLogin = (userInfo: LoginProps) =>
    dispatch(loginAsync.request(userInfo));
  const onLogout = () => dispatch(logoutAsync.request(undefined));
  const onMe = () => dispatch(meAsync.request(undefined));
  const onCsrfToken = () => dispatch(csrfAsync.request(undefined));

  return { loginUser, onSignup, onLogin, onLogout, onMe, onCsrfToken };
}

export const fetchToken = () => tokenRef.current;
export const fetchCsrfToken = () => csrfRef.current;
