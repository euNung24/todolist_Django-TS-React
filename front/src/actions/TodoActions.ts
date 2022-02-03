import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { ListTypes } from "../components/Body";
import { TodoState } from "../components/Todolist";

export const SET_TODO = "todolist/SET_TODO" as const;
export const DELETE_TODO = "todolist/DELETE_TODO" as const;
export const CREATE_TODO = "todolist/CREATE_TODO" as const;
export const UPDATE_TODO = "todolist/UPDATE_TODO" as const;

export const setTodo = (todolist: ListTypes[]) => ({
  type: SET_TODO,
  payload: todolist,
});

const deleteTodo = (id: number, todo: ListTypes) => ({
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

const updateTodo = (todolist: ListTypes) => ({
  type: UPDATE_TODO,
  payload: todolist,
});

export type TodoAction =
  | ReturnType<typeof setTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof createTodo>
  | ReturnType<typeof updateTodo>;

export const setTodoThunk: ThunkAction<void, TodoState, string, TodoAction> = (
  dispatch,
  _,
  date
) => {
  axios
    .get("/todolist", { params: { date: date } })
    .then(({ data }) => dispatch(setTodo(data)));
};

export const deleteTodoThunk: ThunkAction<
  void,
  TodoState,
  { id: number; todo: ListTypes },
  TodoAction
> = (dispatch, _, { id, todo }) => {
  axios.delete(`/todolist/${id}`).then((_) => dispatch(deleteTodo(id, todo)));
};

export const createTodoThunk: ThunkAction<
  void,
  TodoState,
  ListTypes,
  TodoAction
> = (dispatch, _, todolist) => {
  console.log(todolist);
  axios
    .post(`/todolist/`, todolist)
    .then(({ data }) => dispatch(createTodo(data)));
};

export const updateTodoThunk: ThunkAction<
  void,
  TodoState,
  { id: number; isFinished: boolean },
  TodoAction
> = (dispatch, _, { id, isFinished }) => {
  axios
    .patch(`/todolist/${id}/`, { isFinished: !isFinished })
    .then(({ data }) => dispatch(updateTodo(data)));
};
