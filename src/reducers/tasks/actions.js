export const ADD_LIST = "ADD_NEW_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const addList = payload => ({
  type: ADD_LIST,
  payload
});

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
