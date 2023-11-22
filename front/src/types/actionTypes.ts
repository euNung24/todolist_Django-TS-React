import { setDate } from "../actions/DateActions";
import { createTodo, deleteTodo, setTodo, showError, updateTodo } from "../actions/TodoActions";

export type DateAction = ReturnType<typeof setDate>;

export type TodoAction =
  | ReturnType<typeof setTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof createTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof showError>;
