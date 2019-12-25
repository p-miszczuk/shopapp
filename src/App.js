import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/store";
import "./App.css";
import Login from "./layouts/Login";
import Content from "./layouts/Content";

const store = createStore(rootReducer);

const fakeAuth = {
  state: false,
  in(cb) {
    fakeAuth.state = true;
    setTimeout(cb, 100);
  }
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PrivateRoute path="/in">
          <Content />
        </PrivateRoute>
        <Route path="/login">
          <Login useHistory={useHistory} fakeAuth={fakeAuth} />
        </Route>
      </Router>
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
