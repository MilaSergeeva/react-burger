import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.loggedIn === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/signin" }} />
      )
    }
  />
);
// import React, { useEffect, FC } from 'react';
// import { useDispatch } from '../../services/type/hooks';
// import { Redirect, Route } from 'react-router-dom';
// import { RouteProps } from 'react-router-dom';
// import { getNewAccessToken } from '../../services/actions/auth';

// const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
//   const dispatch = useDispatch();
//   const refreshToken = Boolean(localStorage.refreshToken);

//   useEffect(() => {
//     if (refreshToken) {
//       dispatch(getNewAccessToken());
//     }
//   }, [dispatch, refreshToken]);

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         refreshToken ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;

export default ProtectedRoute;
