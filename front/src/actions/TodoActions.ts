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
import { TodoType, UserType } from "../types/apiTypes";

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

export const showError = (errMsg = "서버 요청 중 요류가 발생했습니다.") => ({
  type: ERROR,
  payload: { errMsg },
});

const Api = axios.create({
  baseURL: process.env.API_URL,
});

export const setTodoThunk: ThunkAction<void, TodoState, string, TodoAction> = (
  dispatch,
  getState,
  date,
) => {
  Api.get("/todolist", {
    params: { date: date },
    headers: {
      Authorization: getState().user.token,
    },
  })
    .then(({ data }) => {
      dispatch(setTodo(data));
    })
    .catch((e) => {
      dispatch(showError());
    });
};

export const deleteTodoThunk: ThunkAction<
  void,
  UserType,
  { id: number; todo: TodoType },
  TodoAction
> = (dispatch, getState, { id, todo }) => {
  Api.delete(`/todolist/${id}`, {
    headers: {
      Authorization: getState().token,
    },
  })
    .then((_) => dispatch(deleteTodo(id, todo)))
    .catch((e) => dispatch(showError()));
};

export const createTodoThunk: ThunkAction<
  void,
  UserType,
  Omit<TodoType, "id">,
  TodoAction
> = (dispatch, getState, todolist) => {
  Api.post(`/todolist/`, todolist, {
    headers: {
      Authorization: getState().token,
    },
  })
    .then(({ data }) => dispatch(createTodo(data)))
    .catch((e) => dispatch(showError()));
};

export const updateTodoThunk: ThunkAction<
  Promise<TodoType>,
  UserType,
  { id: number; isFinished: boolean },
  TodoAction
> = (dispatch, getState, { id, isFinished }) => {
  return Api.patch(
    `/todolist/${id}/`,
    {
      isFinished,
    },
    {
      headers: {
        Authorization: getState().token,
      },
    },
  )
    .then(({ data }) => {
      dispatch(updateTodo(data));
      return data;
    })
    .catch((e) => {
      dispatch(showError());
      return;
    });
};
