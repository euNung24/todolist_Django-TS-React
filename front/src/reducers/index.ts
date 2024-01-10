import { combineReducers } from "redux";
import date from "./DateReducers";
import todolist from "./TodoReducers";
import user from "./UserReducers";
import stickyNote from "./StickyNoteReducers";

const reducers = combineReducers({
  todolist,
  date,
  user,
  stickyNote,
});

export default reducers;
