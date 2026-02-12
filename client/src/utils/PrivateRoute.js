import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./index";

const PrivateRoute = ({ path, exact, component: Component, routeProps, children }) => {
  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isLogin()
          ? (Component ? <Component {...routeProps} /> : children)
          : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
