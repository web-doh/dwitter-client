import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
  isAuthenticated: boolean;
} & RouteProps;

const PrivateRoute = ({
  children,
  isAuthenticated,
  ...props
}: PrivateRouteProps) => {
  return (
    <Route
      {...props}
      render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
