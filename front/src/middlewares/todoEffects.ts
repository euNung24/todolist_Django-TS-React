import { Middleware } from "redux";
import { setTodoThunk, showError } from "../actions/TodoActions";
import { TodoState } from "../components/Todolist";
import { DELETE_USER, SET_DATE, SET_USER } from "../actions/constant";

export const todoEffect: Middleware<{}, TodoState> =
  (store) => (nextRunner) => (action) => {
    const result = nextRunner(action);

    if (
      action.type === SET_USER ||
      action.type === DELETE_USER ||
      action.type === SET_DATE
    ) {
      try {
        const state = store.getState();
        state.user.token &&
          setTodoThunk(
            store.dispatch,
            () => state,
            state.date.date.split(".").join("-"),
          );
      } catch (error) {
        store.dispatch(showError("오류발생"));
      }
    }
    return result;
  };
