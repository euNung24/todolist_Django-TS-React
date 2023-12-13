import { Middleware } from "redux";
import { setTodoThunk, showError } from "../actions/TodoActions";
import { initState, TodoState } from "../components/Todolist";
import {
  CREATE_TODO,
  DELETE_TODO,
  SET_DATE,
  UPDATE_TODO,
} from "../actions/constant";
import { getToken } from "../../utils";

export const todoEffect: Middleware<{}, TodoState> =
  (store) => (nextRunner) => (action) => {
    const result = nextRunner(action);
    if (
      action.type === SET_DATE ||
      action.type == DELETE_TODO ||
      action.type == CREATE_TODO
    ) {
      try {
        const state = store.getState();
        getToken() && setTodoThunk(store.dispatch, () => initState, state.date.date.split(".").join("-"));
      } catch (error) {
        store.dispatch(showError("오류발생"));
      }
    }
    return result;
  };
