import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const account = useSelector((state) => state.account);
  const { isLoggedIn } = account;

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
