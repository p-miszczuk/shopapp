export const signInByEmail = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    console.log(email, password);
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
};
