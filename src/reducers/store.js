import { combineReducers } from "redux";
import { reducer } from "./tasks/reducer";

const rootReducer = combineReducers({ reducer });
export default rootReducer;
