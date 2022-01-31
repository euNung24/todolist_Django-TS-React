import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { ListTypes } from "../components/Body";
import { TodoState } from "../components/Todolist";

export const SET_TODO = "todolist/SET_TODO" as const;
export const DELETE_TODO = "todolist/DELETE_TODO" as const;
export const CREATE_TODO = "todolist/CREATE_TODO" as const;

const setTodo = (todolist: ListTypes[]) => ({
  type: SET_TODO,
  payload: todolist,
});

const deleteTodo = (id: string, todo: ListTypes) => ({
  type: DELETE_TODO,
  payload: {
    deleteTodo: {
      id,
      todo,
    },
  },
});

const createTodo = (todolist: ListTypes) => ({
  type: CREATE_TODO,
  payload: todolist,
});

export type TodoAction =
  | ReturnType<typeof setTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof createTodo>;

type Thunk = ThunkAction<void, TodoState, null, TodoAction>;

export const setTodoThunk = (): Thunk => {
  return (dispatch: Function) => {
    axios.get("/todolist").then(({ data }) => dispatch(setTodo(data)));
  };
};

export const deleteTodoThunk = (id: string, todo: ListTypes): Thunk => {
  return (dispatch: Function) => {
    axios.delete(`/todolist/${id}`).then((_) => dispatch(deleteTodo(id, todo)));
  };
};

export const createTodoThunk = (todolist: ListTypes): Thunk => {
  return (dispatch: Function) => {
    console.log(todolist);
    axios
      .post(`/todolist/`, todolist)
      .then(({ data }) => dispatch(createTodo(data)));
  };
};
