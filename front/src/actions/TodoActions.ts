import axios from "axios";
import { ListTypes } from "../components/Body";

export const SET_TODO = "todolist/SET_TODO" as const;

const setTodo = (todolist: ListTypes[]) => ({
  type: SET_TODO,
  payload: todolist,
});

export const setTodoThunk = () => {
  return (dispatch: Function) => {
    axios.get("/todolist").then(({ data }) => dispatch(setTodo(data)));
  };
};

export type TodoAction = ReturnType<typeof setTodo>;
