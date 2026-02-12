import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./index";

const PublicRoute = ({ path, exact, component: Component, restricted, routeProps }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isLogin() && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default PublicRoute;
