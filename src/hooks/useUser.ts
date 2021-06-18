import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { loginAsync, logout } from "../modules/login_user/actions";

import { IRequest } from "../service/auth";

export default function useUser() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  const onLogin = (userInfo: IRequest) =>
    dispatch(loginAsync.request(userInfo));
  const onLogout = () => dispatch(logout());

  return { loginUser, onLogin, onLogout };
}
