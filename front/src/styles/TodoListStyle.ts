import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: "Gamja Flower", cursive;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
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
    background: #5E5955;
    display: flex;
    justify-content: center;
    align-items: center;
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
