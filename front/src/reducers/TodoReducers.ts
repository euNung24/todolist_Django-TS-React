import { TodoAction } from "../types/actionTypes";
import {
  CREATE_TODO,
  DELETE_TODO,
  ERROR,
  SET_TODO,
  UPDATE_TODO,
} from "../actions/constant";
import { TodoListState } from "../components/Todolist";

const todolist = (
  state: TodoListState = {
    todolist: {},
    ids: [],
  },
  action: TodoAction,
) => {
  switch (action.type) {
    case SET_TODO: {
      const ids = action.payload.map((todolist) => todolist["id"]);
      const todolist = action.payload.reduce(
        (final, todolist) => ({
          ...final,
          [todolist.id]: todolist,
        }),
        {},
      );
      return { ...state, ids, todolist, errMsg: "" };
    }
    case DELETE_TODO: {
      const deleteTodo = action.payload.deleteTodo;
      const deleteId = deleteTodo.id;
      const ids = state.ids.filter((id) => id !== deleteId);
      const todolist = { ...state.todolist };
      delete todolist[deleteId];

      return {
        ...state,
        ids,
        todolist,
        deleteTodo,
        errMsg: "",
      };
    }
    case CREATE_TODO: {
      const createdId = action.payload.id;

      return {
        ...state,
        ids: [...state.ids, createdId],
        todolist: {
          ...state.todolist,
          [createdId]: action.payload,
        },
        errMsg: "",
      };
    }
    case UPDATE_TODO: {
      const id = action.payload;
      return {
        ...state,
        todolist: {
          ...state.todolist,
          [id]: {
            ...state.todolist[id],
            isFinished: !state.todolist[id].isFinished,
          },
        },
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
