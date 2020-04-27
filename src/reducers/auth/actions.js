import history from "../../history";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const SET_AUTH = "SET_AUTH";

export const signInByEmail = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOGIN_REQUEST });
    const fb = getFirebase();

    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/in");
      })
      .catch(function(error) {
        console.log("error ", error);
        dispatch({ type: LOGIN_ERROR, payload: error.message });
      });
  };
};

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOGOUT_REQUEST });
    const fb = getFirebase();

    fb.auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: LOGOUT_ERROR, payload: error.message });
      });
  };
};
