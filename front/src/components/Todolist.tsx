import React from "react";
import { IconContext } from "react-icons/lib";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { todoEffect } from "../middlewares/todoEffects";
import reducers from "../reducers/index";

import Body, { ListTypes } from "./Body";
import Head from "./Head";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  input {
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  #root {
    width: 100vw;
    height: 100vh;
    background: #5E5955;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const WrappedStyle = styled.div`
  width: 45%;
  min-width: 360px;
  height: 80%;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

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
      <IconContext.Provider
        value={{ style: { fontSize: "30px", verticalAlign: "middle" } }}
      >
        <GlobalStyle />
        <WrappedStyle>
          <Head />
          <Body />
        </WrappedStyle>
      </IconContext.Provider>
    </Provider>
  );
};

export default Todolist;
