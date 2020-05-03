import {
  ADD_LIST_REQUEST,
  ADD_LIST_SUCCESS,
  ADD_LIST_ERROR,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCES,
  DELETE_LIST_ERROR,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from "./actions";

const initialState = {
  listRequest: false,
  listError: "",
  list: [
    {
      id: 1,
      name: "Lista 1",
      list: [{ id: 1, task: "Task 1", info: "Info 1" }],
      date: "22/12/2019"
    },
    {
      id: 2,
      name: "Lista 2",
      list: [
        { id: 1, task: "Task 1", info: "Info 1" },
        { id: 2, task: "Task 2", info: "Info 2" }
      ],
      date: "24/12/2019"
    }
  ]
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
    case ADD_TASK:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.idList
            ? {
                ...item,
                list: item.list.concat(action.payload.task)
              }
            : item
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.listId
            ? {
                ...item,
                list: action.payload.tasks
              }
            : { ...item }
        )
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
