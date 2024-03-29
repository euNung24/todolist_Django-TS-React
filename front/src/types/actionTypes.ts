import { setDate } from "../actions/DateActions";
import {
  createTodo,
  deleteTodo,
  setTodo,
  showError,
  updateTodo,
} from "../actions/TodoActions";
import { deleteUser, setUser } from "../actions/UserActions";
import {
  changePositionStickyNote,
  createStickyNote,
  deleteStickyNote,
  resizeStickyNote,
  updateStickyNote,
} from "../actions/StickyNoteActions";

export type DateAction = ReturnType<typeof setDate>;

export type UserAction =
  | ReturnType<typeof setUser>
  | ReturnType<typeof deleteUser>;

export type TodoAction =
  | ReturnType<typeof setTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof createTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof showError>;

export type StickyNoteAction =
  | ReturnType<typeof deleteStickyNote>
  | ReturnType<typeof createStickyNote>
  | ReturnType<typeof updateStickyNote>
  | ReturnType<typeof resizeStickyNote>
  | ReturnType<typeof changePositionStickyNote>;
