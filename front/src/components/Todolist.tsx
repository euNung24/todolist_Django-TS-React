import React, { useEffect, useState } from "react";
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
import cursor from "../cursor.png";

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
  key: "user",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(thunk, todoEffect),
);

const persistor = persistStore(store);

const Todolist = () => {
  const [cursorPosition, setCursorPosition] = useState([-20, -20]);
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPosition([e.clientX - 5, e.clientY - 5]);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <WrappedStyle>
          <img
            src={cursor}
            alt="cursor"
            style={{
              width: "20px",
              height: "20px",
              position: "fixed",
              left: cursorPosition[0],
              top: cursorPosition[1],
              pointerEvents: "none",
            }}
          />
          <Head />
          <Body />
        </WrappedStyle>
      </PersistGate>
    </Provider>
  );
};

export default Todolist;
