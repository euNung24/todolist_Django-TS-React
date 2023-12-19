import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { TodoState } from "../components/Todolist";
import { TodoAction } from "../types/actionTypes";
import {
  CREATE_TODO,
  DELETE_TODO,
  ERROR,
  SET_TODO,
  UPDATE_TODO,
} from "./constant";
import { TodoType } from "../types/apiTypes";
import { getToken } from "../../utils";

export const setTodo = (todolist: TodoType[]) => ({
  type: SET_TODO,
  payload: todolist,
});

export const deleteTodo = (id: number, todo: TodoType) => ({
  type: DELETE_TODO,
  payload: {
    deleteTodo: {
      id,
      todo,
    },
  },
});

export const createTodo = (todolist: TodoType) => ({
  type: CREATE_TODO,
  payload: todolist,
});

export const updateTodo = (id: number) => ({
  type: UPDATE_TODO,
  payload: id,
});

export const showError = (errMsg: string) => ({
  type: ERROR,
  payload: { errMsg },
});

const Api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: getToken(),
  },
});

export const setTodoThunk: ThunkAction<void, TodoState, string, TodoAction> = (
  dispatch,
  _,
  date,
) => {
  Api.get("/todolist", {
    params: { date: date },
  }).then(({ data }) => {
    dispatch(setTodo(data));
  });
};

export const deleteTodoThunk: ThunkAction<
  void,
  TodoState,
  { id: number; todo: TodoType },
  TodoAction
> = (dispatch, _, { id, todo }) => {
  Api.delete(`/todolist/${id}`).then((_) => dispatch(deleteTodo(id, todo)));
};

export const createTodoThunk: ThunkAction<
  void,
  TodoState,
  Omit<TodoType, "id">,
  TodoAction
> = (dispatch, _, todolist) => {
  Api.post(`/todolist/`, todolist).then(({ data }) =>
    dispatch(createTodo(data)),
  );
};

export const updateTodoThunk: ThunkAction<
  Promise<TodoType>,
  TodoState,
  { id: number; isFinished: boolean },
  TodoAction
> = (dispatch, _, { id, isFinished }) => {
  return Api.patch(`/todolist/${id}/`, {
    isFinished,
  }).then(({ data }) => {
    dispatch(updateTodo(data));
    return data;
  });
};
