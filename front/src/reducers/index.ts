import { combineReducers } from "redux";
import date from "./DateReducers";
import todolist from "./TodoReducers";
import user from "./UserReducers";

const reducers = combineReducers({
  todolist,
  date,
  user,
});

export default reducers;
