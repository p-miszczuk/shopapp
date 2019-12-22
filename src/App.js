import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import "./App.css";
import { Button, Grid } from "@material-ui/core";
import Login from "./layouts/Login";

const fakeAuth = {
  state: false,
  in(cb) {
    fakeAuth.state = true;
    setTimeout(cb, 100);
  }
};

function App() {
  return (
    <Router>
      <Route path="/login">
        <Login useHistory={useHistory} fakeAuth={fakeAuth} />
      </Route>
      <PrivateRoute path="/in">
        <Content />
      </PrivateRoute>
    </Router>
  );
}

const Content = () => <div>Here content</div>;

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return fakeAuth.state ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default App;
