import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../reducers/index";
import todolist from "../reducers/TodoReducers";

import Body, { ListTypes } from "./Body";
import Head from "./Head";

export type TodoState = {
  todolist: {
    ids: number[];
    todolist: { [id: number]: ListTypes };
  };
  date: { date: string };
};

export const initState: TodoState = {
  todolist: {
    ids: [],
    todolist: {},
  },
  date: {
    date: "",
  },
};

const Todolist = () => {
  const store = createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return (
    <Provider store={store}>
      <Head />
      <Body />
    </Provider>
  );
};

export default Todolist;
