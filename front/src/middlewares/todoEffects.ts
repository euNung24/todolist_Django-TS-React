import moment from "moment";
import { Middleware } from "redux";
import { SET_DATE } from "../actions/DateActions";
import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  setTodoThunk,
} from "../actions/TodoActions";
import { initState, TodoState } from "../components/Todolist";

export const todoEffect: Middleware<{}, TodoState> =
  (store) => (nextRunner) => (action) => {
    const result = nextRunner(action);
    if (
      action.type === SET_DATE ||
      action.type == DELETE_TODO ||
      action.type == CREATE_TODO ||
      action.type == UPDATE_TODO
    ) {
      const state = store.getState();
      console.log(state);
      const convertDate = moment(state.date.date)
        .locale("ko")
        .format("YYYY-MM-DD");

      setTodoThunk(store.dispatch, () => initState, convertDate);
    }
    return result;
  };
