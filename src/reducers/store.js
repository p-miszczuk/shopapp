import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { reducer } from "./tasks/reducer";
import { authReducer } from "./auth/reducer";
import firebase from "../utils/fbConfig";

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const rootReducer = combineReducers({ authReducer, reducer });
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), reduxFirestore(firebase))
);
export default store;
