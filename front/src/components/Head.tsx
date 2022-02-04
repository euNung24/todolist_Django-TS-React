import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setDate } from "../actions/DateActions";
import {
  StyledHead,
  StyledH2,
  StyledButtonWrapper,
  StyledSpan,
} from "../styles/HeadStyle";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const Head = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const getDate = (count: number) => {
    const todayDate = moment().locale("ko").add(count, "days").format("L");
    return todayDate;
  };

  const getDay = (count: number) => {
    const todayDate = moment().locale("ko").add(count, "days").format("ddd");
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
  };

  return (
    <StyledHead>
      <StyledH2>To Do List</StyledH2>
      <StyledButtonWrapper>
        <button type="button" onClick={clickPrev}>
          <MdArrowLeft />
        </button>
        <StyledSpan day={false}>{getDate(count)}</StyledSpan>
        <StyledSpan day>{getDay(count)}</StyledSpan>
        <button type="button" onClick={clickNext}>
          <MdArrowRight />
        </button>
      </StyledButtonWrapper>
    </StyledHead>
  );
};

export default Head;
