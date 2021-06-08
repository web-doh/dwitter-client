import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { login, logout, user } from "../modules/users";

export default function useUser() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  const onLogin = useCallback(
    (user: user) => dispatch(login(user)),
    [dispatch]
  );
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return { loginUser, onLogin, onLogout };
}
