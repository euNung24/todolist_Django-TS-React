import { TodoAction } from "../types/actionTypes";
import {
  CREATE_TODO,
  DELETE_TODO,
  ERROR,
  SET_TODO,
  UPDATE_TODO,
} from "../actions/constant";

const todolist = (state = {}, action: TodoAction) => {
  switch (action.type) {
    case SET_TODO:
      const ids = action.payload.map((todolist) => todolist["id"]);
      const todolist = action.payload.reduce(
        (final, todolist) => ({
          ...final,
          [todolist.id]: todolist,
        }),
        {},
      );
      return { ...state, ids, todolist, errMsg: "" };
    case DELETE_TODO:
      const deleteTodo = action.payload.deleteTodo;
      return {
        ...state,
        deleteTodo,
        errMsg: "",
      };
    case CREATE_TODO: {
      return {
        ...state,
        errMsg: "",
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        errMsg: "",
      };
    }
    case ERROR: {
      return {
        ...state,
        errMsg: action.payload.errMsg,
      };
    }
    default:
      return state;
  }
};

export default todolist;
