import { v4 as uuidv4 } from "uuid";

export const ADD_LIST_REQUEST = "ADD_NEW_LIST_REQUEST";
export const ADD_LIST_SUCCESS = "ADD_NEW_LIST_SUCCESS";
export const ADD_LIST_ERROR = "ADD_NEW_LIST_ERROR";
export const DELETE_LIST = "DELETE_LIST";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const addList = name => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: ADD_LIST_REQUEST });
    const fs = getFirestore();
    const listId = uuidv4();
    const userId = getState().firebase.auth.uid;

    fs.collection("tasks")
      .doc(listId)
      .set({
        userId,
        name,
        date: new Date()
      })
      .then(() => {
        dispatch({ type: ADD_LIST_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: ADD_LIST_ERROR });
      });
  };
};

export const deleteList = payload => ({
  type: DELETE_LIST,
  payload
});

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
