import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";
import "./App.css";
import Login from "./layouts/Login";
import Content from "./layouts/Content";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./utils/fbConfig";

const fakeAuth = {
  state: false,
  in(cb) {
    fakeAuth.state = true;
    setTimeout(cb, 100);
  }
};

const rrfConfig = {};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <PrivateRoute path="/in">
            <Content />
          </PrivateRoute>
          <Route path="/login">
            <Login useHistory={useHistory} fakeAuth={fakeAuth} />
          </Route>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

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
