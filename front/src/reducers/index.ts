import { combineReducers } from "redux";
import date from "./DateReducers";
import todolist from "./TodoReducers";

const reducers = combineReducers({
  todolist,
  date,
});

export default reducers;
