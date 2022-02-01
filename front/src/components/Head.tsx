import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { setDate } from "../actions/DateActions";
import { setTodoThunk } from "../actions/TodoActions";
import { TodoState } from "./Todolist";

const StyledHead = styled.header`
  background: #cdcdcd;
`;

const StyledH2 = styled.h2`
  font-size: 42px;
`;

const Head = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const { date } = useSelector((state: TodoState) => ({
    date: state.date.date,
  }));

  const getDate = (count: number) => {
    const todayDate = moment().locale("ko").add(count, "days").format("L");
    return todayDate;
  };

  useEffect(() => {
    dispatch(setDate(getDate(count)));
    return;
  }, [count]);

  const clickPrev = () => {
    setCount((prevState) => prevState - 1);
  };

  const clickNext = () => {
    setCount((prevState) => prevState + 1);
    const convertDate = moment(date).locale("ko").format("YYYY-MM-DD");
    console.log(convertDate);
    dispatch(setTodoThunk(convertDate));
  };

  return (
    <StyledHead>
      <StyledH2>TO DO LIST</StyledH2>
      <div>
        <button type="button" onClick={clickPrev}>
          ◀
        </button>
        <span>{getDate(count)}</span>
        <button type="button" onClick={clickNext}>
          ▶
        </button>
      </div>
    </StyledHead>
  );
};

export default Head;
