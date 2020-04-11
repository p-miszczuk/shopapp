import {
  ADD_LIST,
  DELETE_LIST,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from "./actions";

const initialState = {
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

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    case DELETE_LIST:
      return {
        ...state,
        list: state.list.filter(item => !action.payload.includes(item.id))
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
