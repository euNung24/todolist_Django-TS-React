import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { todoEffect } from "../middlewares/todoEffects";
import reducers from "../reducers/index";

import Body from "./Body";
import Head from "./Head";
import GoogleLoginButton from './GoogleLoginButton';
import { GlobalStyle, WrappedStyle } from "../styles/TodoListStyle";
import { IconContext } from "react-icons";
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
    composeWithDevTools(applyMiddleware(thunk, todoEffect))
  );

  return (
    <Provider store={store}>
      <IconContext.Provider
        value={{
          style: { fontSize: "30px", verticalAlign: "middle" },
        }}
      >
        <GlobalStyle />
        <WrappedStyle>
          <GoogleLoginButton />
          <Head />
          <Body />
        </WrappedStyle>
      </IconContext.Provider>
    </Provider>
  );
};

export default Todolist;
