import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers/index";

import Body from "./Body";
import Head from "./Head";
import { GlobalStyle, WrappedStyle } from "../styles/TodoListStyle";
import { TodoType, UserType } from "../types/apiTypes";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { todoEffect } from "../middlewares/todoEffects";
import { PersistGate } from "redux-persist/integration/react";

export type TodoListState = {
  ids: number[];
  todolist: { [id: number]: TodoType };
  errMsg?: string;
};

export type TodoState = {
  todolist: TodoListState;
  date: { date: string };
  user: UserType;
};

const persistConfig = {
  key: "todolist",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(thunk, todoEffect),
);

const persistor = persistStore(store);

const Todolist = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <WrappedStyle>
          <Head />
          <Body />
        </WrappedStyle>
      </PersistGate>
    </Provider>
  );
};

export default Todolist;
