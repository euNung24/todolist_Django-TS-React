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
import { getLocalTodo, setLocalTodo } from "../../utils";

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

export const setTodoThunk: ThunkAction<void, TodoState, string, TodoAction> = (
  dispatch,
  _,
  date,
) => {
  dispatch(setTodo(getLocalTodo(date)));
};

export const deleteTodoThunk: ThunkAction<
  void,
  TodoState,
  { id: number; todo: TodoType; date: string },
  TodoAction
> = (dispatch, _, { id, todo, date }) => {
  const data = getLocalTodo(date);
  if (data.length > 0) {
    const newData = data.filter((v) => v.id !== id);
    setLocalTodo(date, newData);
    dispatch(deleteTodo(id, todo));
  }
};

export const createTodoThunk: ThunkAction<
  void,
  TodoState,
  TodoType,
  TodoAction
> = (dispatch, _, todolist) => {
  const { date } = todolist;
  setLocalTodo(date, [...getLocalTodo(date), todolist]);
  dispatch(createTodo(todolist));
};

export const updateTodoThunk: ThunkAction<
  void,
  TodoState,
  { id: number; isFinished: boolean; date: string },
  TodoAction
> = (dispatch, _, { id, isFinished, date }) => {
  const data = getLocalTodo(date);
  if (data.length > 0) {
    const newData = data.map((v) =>
      v.id === id ? { ...v, isFinished: !v.isFinished } : v,
    );
    setLocalTodo(date, newData);
    dispatch(updateTodo(id));
  }
};
