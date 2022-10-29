import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/data";
import PropTypes from "prop-types";

const ProtectedRoute = ({ onlyForAuth, children, ...rest }) => {
  const hasUser = getCookie("accessToken");
  const location = useLocation();

  if (!onlyForAuth && hasUser) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !hasUser) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any.isRequired,
  onlyForAuth: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
