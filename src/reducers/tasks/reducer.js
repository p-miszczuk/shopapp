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
        list: state.list.list.concat(action.payload)
      };
    case DELETE_TASK:
      return {
        ...state,
        list: state.list.list.slice(action.payload)
      };
    case UPDATE_TASK:
      return {
        ...state,
        list: state.list.list.slice(action.payload)
      };
    default:
      return state;
  }
};
