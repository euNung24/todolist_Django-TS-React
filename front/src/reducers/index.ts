import { combineReducers } from "redux";
import date from "./DateReducers";
import todolist from "./TodoReducers";
import stickyNoteReducers from "./StickyNoteReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import user from "./UserReducers";

const stickyNotePersistConfig = {
  key: "stickyNote",
  storage,
};

const reducers = combineReducers({
  todolist,
  date,
  user,
  stickyNote: persistReducer(stickyNotePersistConfig, stickyNoteReducers),
});

export default reducers;
