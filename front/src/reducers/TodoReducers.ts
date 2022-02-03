import {
  CREATE_TODO,
  DELETE_TODO,
  SET_TODO,
  TodoAction,
  UPDATE_TODO,
} from "../actions/TodoActions";

const todolist = (state = {}, action: TodoAction) => {
  switch (action.type) {
    case SET_TODO:
      const ids = action.payload.map((todolist) => todolist["id"]);
      const todolist = action.payload.reduce(
        (final, todolist) => ({
          ...final,
          [todolist.id!]: todolist,
        }),
        {}
      );
      return { ...state, ids, todolist };
    case DELETE_TODO:
      const deleteTodo = action.payload.deleteTodo;
      return {
        ...state,
        deleteTodo,
      };
    case CREATE_TODO: {
      return {
        ...state,
      };
    }
    case UPDATE_TODO: {
      // const updateTodo = action.payload;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default todolist;

export type Todolist_Action = ReturnType<typeof todolist>;
