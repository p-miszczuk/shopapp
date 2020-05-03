import { v4 as uuidv4 } from "uuid";

export const ADD_LIST_REQUEST = "ADD_NEW_LIST_REQUEST";
export const ADD_LIST_SUCCESS = "ADD_NEW_LIST_SUCCESS";
export const ADD_LIST_ERROR = "ADD_NEW_LIST_ERROR";
export const DELETE_LIST_REQUEST = "DELETE_LIST_REQUEST";
export const DELETE_LIST_SUCCES = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_ERROR = "DELETE_LIST_ERROR";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const addList = name => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: ADD_LIST_REQUEST });
    const fs = getFirestore();
    const listId = uuidv4();
    const userId = getState().firebase.auth.uid;

    const batch = fs.batch();

    batch.set(fs.doc(`/tasks/${userId}/list/${listId}`), {
      userId,
      name,
      date: new Date()
    });
    batch
      .commit()
      .then(() => {
        dispatch({ type: ADD_LIST_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: ADD_LIST_ERROR, payload: error.message });
      });
  };
};

export const deleteList = values => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: DELETE_LIST_REQUEST });
    const fs = getFirestore();
    const userId = getState().firebase.auth.uid;

    if (userId) {
      const batch = fs.batch();
      values.forEach(id => {
        batch.delete(fs.doc(`/tasks/${userId}/list/${id}`));
      });

      batch
        .commit()
        .then(() => {
          dispatch({ type: DELETE_LIST_SUCCES });
        })
        .catch(error => {
          dispatch({ type: DELETE_LIST_ERROR, payload: error.message });
        });
    }
  };
};

export const addTask = payload => ({
  type: ADD_TASK,
  payload
});

export const deleteTask = payload => ({
  type: DELETE_TASK,
  payload
});

export const updateTask = payload => ({
  type: UPDATE_TASK,
  payload
});
