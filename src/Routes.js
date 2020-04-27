import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Content from "./layouts/Content";
import firebase from "./utils/fbConfig";
import Login from "./layouts/Login";
import Spinner from "./components/Spinner";

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const Routes = ({ auth, loginLoaded }) => {
  const history = useHistory();

  useEffect(() => {
    checkAuthStatus();
    return () => {
      checkAuthStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && history.location.pathname !== "/") {
        history.push("/");
      }
    });
  };

  if (!auth.isLoaded) {
    return <Spinner />;
  }

  return (
    <Switch>
      <PrivateRoute exact path="/" isAuth={auth.uid} component={Content} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

const mapStateToProps = ({ firebase }) => ({
  auth: firebase.auth
});

export default connect(mapStateToProps)(Routes);
