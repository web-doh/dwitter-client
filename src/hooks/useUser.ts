import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import {
  loginAsync,
  logoutAsync,
  meAsync,
  signupAsync,
} from "../modules/login_user/actions";

import { IRequest } from "../service/auth";

export default function useUser() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  const onSignup = (userInfo: IRequest) =>
    dispatch(signupAsync.request(userInfo));
  const onLogin = (userInfo: IRequest) =>
    dispatch(loginAsync.request(userInfo));
  const onLogout = () => dispatch(logoutAsync.request(undefined));
  const onMe = () => dispatch(meAsync.request(undefined));

  return { loginUser, onSignup, onLogin, onLogout, onMe };
}
