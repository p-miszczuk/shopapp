import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import {
  getFirestore,
  reduxFirestore,
  firestoreReducer
} from "redux-firestore";
import { tasksReducer } from "./tasks/reducer";
import { authReducer } from "./auth/reducer";
import firebase from "../utils/fbConfig";

const middleware = [
  thunk.withExtraArgument({
    getFirebase,
    getFirestore
  })
];
const rootReducer = combineReducers({
  authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  tasksReducer
});
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), reduxFirestore(firebase))
);
export default store;
