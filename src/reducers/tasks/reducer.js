import {
  ADD_LIST_REQUEST,
  ADD_LIST_SUCCESS,
  ADD_LIST_ERROR,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCES,
  DELETE_LIST_ERROR,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  UPDATE_TASK
} from "./actions";

const initialState = {
  listRequest: false,
  tasksRequest: false,
  listError: "",
  tasksError: ""
};

const updateList = ({ id, listId, info, task, stateList }) => {
  return stateList.map(list =>
    list.id === listId
      ? {
          ...list,
          list: list.list.map(item =>
            item.id === id ? { id, info, task } : { ...item }
          )
        }
      : { ...list }
  );
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_REQUEST:
      return {
        ...state,
        listRequest: true
      };
    case ADD_LIST_SUCCESS:
      return {
        ...state,
        listRequest: false
      };
    case ADD_LIST_ERROR:
      return {
        ...state,
        listError: action.payload,
        listRequest: false
      };
    case DELETE_LIST_REQUEST:
      return {
        ...state,
        listError: "",
        listRequest: true
      };
    case DELETE_LIST_SUCCES:
      return {
        ...state,
        listError: "",
        listRequest: false
      };
    case DELETE_LIST_ERROR:
      return {
        ...state,
        listEror: action.payload,
        listRequest: false
      };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        tasksError: "",
        tasksRequest: true
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasksError: "",
        tasksRequest: false
      };
    case ADD_TASK_ERROR:
      return {
        ...state,
        tasksError: action.payload,
        tasksRequest: false
      };
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        tasksRequest: true
      };
    case UPDATE_TASK:
      const { id, listId, info, input } = action.payload;
      return {
        ...state,
        list: updateList({
          id,
          listId,
          info,
          task: input,
          stateList: state.list
        })
      };
    default:
      return state;
  }
};
