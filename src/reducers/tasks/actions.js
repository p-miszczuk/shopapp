import { v4 as uuidv4 } from "uuid";

export const ADD_LIST_REQUEST = "ADD_NEW_LIST_REQUEST";
export const ADD_LIST_SUCCESS = "ADD_NEW_LIST_SUCCESS";
export const ADD_LIST_ERROR = "ADD_NEW_LIST_ERROR";
export const DELETE_LIST_REQUEST = "DELETE_LIST_REQUEST";
export const DELETE_LIST_SUCCES = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_ERROR = "DELETE_LIST_ERROR";
export const ADD_TASK_REQUEST = "ADD_TASK_REQUEST";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_ERROR = "ADD_TASK_ERROR";
export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_ERROR = "DELETE_TASK_ERROR";
export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_ERROR = "UPDATE_TASK_ERROR";

export const addList = name => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: ADD_LIST_REQUEST });
    const fs = getFirestore();
    const listId = uuidv4();
    const userId = getState().firebase.auth.uid;

    if (userId) {
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
    } else {
      dispatch({ type: ADD_LIST_ERROR, payload: "" });
    }
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
    } else {
      dispatch({ type: DELETE_LIST_ERROR, payload: "" });
    }
  };
};

export const addTask = values => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: ADD_TASK_REQUEST });
    const fs = getFirestore();

    const taskId = uuidv4();
    const userId = getState().firebase.auth.uid;

    if (userId) {
      const batch = fs.batch();
      batch.set(fs.doc(`/tasks/${userId}/tasks/${taskId}`), {
        ...values,
        date: new Date()
      });

      batch
        .commit()
        .then(() => {
          dispatch({ type: ADD_TASK_SUCCESS });
        })
        .catch(error => {
          dispatch({ type: ADD_TASK_ERROR, payload: error.message });
        });
    } else {
      dispatch({ type: ADD_TASK_ERROR, payload: "" });
    }
  };
};

export const deleteTask = values => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: DELETE_TASK_REQUEST });
    const fs = getFirestore();
    const userId = getState().firebase.auth.uid;

    if (userId) {
      const batch = fs.batch();
      values.forEach(id => {
        batch.delete(fs.doc(`/tasks/${userId}/tasks/${id}`));
      });
      batch
        .commit()
        .then(() => {
          dispatch({ type: DELETE_TASK_SUCCESS });
        })
        .catch(error => {
          dispatch({ type: DELETE_TASK_ERROR, payload: error.message });
        });
    } else {
      dispatch({ type: DELETE_TASK_ERROR, payload: "" });
    }
  };
};

export const updateTask = values => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: UPDATE_TASK_REQUEST });
    const fs = getFirestore();
    const userId = getState().firebase.auth.uid;

    if (userId) {
      const batch = fs.batch();
      const updateTask = {
        task: values.input,
        info: values.info
      };
      batch.update(fs.doc(`/tasks/${userId}/tasks/${values.id}`), {
        ...updateTask
      });
      batch
        .commit()
        .then(() => {
          dispatch({ type: UPDATE_TASK_SUCCESS });
        })
        .catch(error => {
          dispatch({ type: UPDATE_TASK_ERROR, payload: error.message });
        });
    } else {
      dispatch({ type: UPDATE_TASK_ERROR, payload: "" });
    }
  };
};
