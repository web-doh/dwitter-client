import { LoginProps, SignUpProps } from "./../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import {
  loginAsync,
  logoutAsync,
  meAsync,
  signupAsync,
} from "../modules/login_user/actions";

export default function useUser() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  const onSignup = (userInfo: SignUpProps) =>
    dispatch(signupAsync.request(userInfo));
  const onLogin = (userInfo: LoginProps) =>
    dispatch(loginAsync.request(userInfo));
  const onLogout = () => dispatch(logoutAsync.request(undefined));
  const onMe = () => dispatch(meAsync.request(undefined));

  return { loginUser, onSignup, onLogin, onLogout, onMe };
}
