import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: "Gamja Flower", cursive;
    cursor: none;
  }

  html[theme="dark-mode"] {
    filter: invert(100%) hue-rotate(180deg);
  }

  button {
    border: none;
    background: none;
    padding: 0;
    //cursor: pointer;
    color: #000;
  }

  input {
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  #root {
    width: 100vw;
    height: 100vh;
    background: #a9a9a9;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s;
  }

  html[theme="dark-mode"] #root {
    background: #8d8d8d;
  }

  html[theme="dark-mode"] img {
    filter: invert(100%) hue-rotate(180deg);
  }

  .theme {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    margin-left: auto;

    &:hover {
      background: #bdbdbd;
      border-radius: 50%;
    }

    &:active {
      animation-duration: 0.15s;
      animation-name: rotate;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(180deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export const WrappedStyle = styled.div`
  width: 45%;
  min-width: 360px;
  height: 80%;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;
