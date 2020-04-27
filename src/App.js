import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store";
import "./App.css";
import Routes from "./Routes";
import history from "./history";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./utils/fbConfig";
import { BrowserRouter as Router } from "react-router-dom";

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
      <Router history={history}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Routes />
        </ReactReduxFirebaseProvider>
      </Router>
    </Provider>
  );
}

export default App;
