import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../reducers";

import Body, { ListTypes } from "./Body";
import Head from "./Head";

export type TodoState = {
  ids: number[];
  todolist: { [id: number]: ListTypes };
};

const Todolist = () => {
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
