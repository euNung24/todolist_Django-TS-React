import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { todoEffect } from "../middlewares/todoEffects";
import reducers from "../reducers/index";

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
    composeWithDevTools(applyMiddleware(thunk, todoEffect))
  );

  return (
    <Provider store={store}>
      <Head />
      <Body />
    </Provider>
  );
};

export default Todolist;
