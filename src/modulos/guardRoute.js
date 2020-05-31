import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexto/auth";

const GuardRoute = ({ component: RouteComponent, layout: Layout, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <Layout>
            <RouteComponent { ...routeProps } />
          </Layout>
        ) : (
          <Redirect to={ "/login" } />
        )
      }
    />
  );
};

export default GuardRoute;
