import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { todoEffect } from "../middlewares/todoEffects";
import reducers from "../reducers/index";

import Body from "./Body";
import Head from "./Head";
import { GlobalStyle, WrappedStyle } from "../styles/TodoListStyle";
import { TodoType } from "../types/apiTypes";

export type TodoState = {
  todolist: {
    ids: number[];
    todolist: { [id: number]: TodoType };
    errMsg?: string;
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
    applyMiddleware(thunk, todoEffect),
  );

  return (
    <Provider store={store}>
      <GlobalStyle />
      <WrappedStyle>
        <Head />
        <Body />
      </WrappedStyle>
    </Provider>
  );
};

export default Todolist;
