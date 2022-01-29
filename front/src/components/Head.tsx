import moment from "moment";
import React, { useState } from "react";

import styled from "styled-components";

const StyledHead = styled.header`
  background: #cdcdcd;
`;

const StyledH2 = styled.h2`
  font-size: 42px;
`;

const Head = () => {
  const [count, setCount] = useState(0);
  let todayDate = moment().locale("ko").add(count, "days").format("L");

  const clickPrev = () => {
    setCount((prevState) => prevState - 1);
    todayDate = moment().locale("ko").add(count, "days").format("L");
  };

  const clickNext = () => {
    setCount((prevState) => prevState + 1);
    todayDate = moment().locale("ko").add(count, "days").format("L");
  };

  return (
    <StyledHead>
      <StyledH2>TO DO LIST</StyledH2>
      <div>
        <button type="button" onClick={clickPrev}>
          ◀
        </button>
        <span>{todayDate}</span>
        <button type="button" onClick={clickNext}>
          ▶
        </button>
      </div>
    </StyledHead>
  );
};

export default Head;
