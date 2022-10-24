import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import appStyles from "../App/app.module.css";

const ProtectedRoute = ({ onlyForAuth = "false", children, ...rest }) => {
  // const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user);
  console.log(user, "bkhkj");
  const location = useLocation();
  const haveUser = user.name !== "" && user.email !== "" ? true : false;
  // if (!isAuthChecked) {
  //   return <div className={appStyles.loader} />;
  // }

  if (onlyForAuth && haveUser) {
    const { from } = location.state || { from: { pathname: "/" } };

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!onlyForAuth && !haveUser) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
