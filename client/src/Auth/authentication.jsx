import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children, ...rest }) => {
  // const loggin = useSelector((state) => state.isLogged);
  const loggin = true;
  let [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, [token]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default { PrivateRoute };
