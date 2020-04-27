import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./layouts/Login";
import Content from "./layouts/Content";
import firebase from "./utils/fbConfig";

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

const Routes = ({ isAuth, isLoaded }) => {
  const history = useHistory();
  console.log(isLoaded);
  useEffect(() => {
    checkAuthStatus();
    return () => {
      checkAuthStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/");
      }
    });
  };

  return (
    <Switch>
      <PrivateRoute exact path="/" isAuth={isAuth} component={Content} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

const mapStateToProps = ({ firebase }) => ({
  isAuth: firebase.auth.uid,
  isLoaded: firebase.auth
});

export default connect(mapStateToProps)(Routes);
