import { SET_TODO, TodoAction } from "../actions/TodoActions";
import { TodoState } from "../components/Todolist";

const initState: TodoState = {
  ids: [],
  todolist: {
    0: {
      id: 0,
      todo: "",
      date: "",
      isFinished: false,
    },
  },
};

const reducers = (state = initState, action: TodoAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TODO:
      const ids = payload.map((todolist) => todolist["id"]);
      const todolist = payload.reduce(
        (final, todolist) => ({
          ...final,
          [todolist["id"]]: todolist,
        }),
        {}
      );
      return { ...state, ids, todolist };
    default:
      return state;
  }
};

export default reducers;
