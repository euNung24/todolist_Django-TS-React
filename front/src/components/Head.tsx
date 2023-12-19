import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setDate } from "../actions/DateActions";
import {
  StyledButtonWrapper,
  StyledH2,
  StyledHead,
  StyledSpan,
} from "../styles/HeadStyle";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import GoogleLoginButton from "./GoogleLoginButton";
import { getToken } from "../../utils";

const weekday = ["일", "월", "화", "수", "목", "금", "토"];
const Head = () => {
  const today = new Date();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const getDate = (count: number) => {
    const newDate = new Date(today.getTime() + 1000 * 24 * 60 * 60 * count);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const dayOfAWeek = weekday[newDate.getDay()];
    return `${year}.${month.toString().padStart(2, "0")}.${date
      .toString()
      .padStart(2, "0")}.${dayOfAWeek}`;
  };

  useEffect(() => {
    dispatch(setDate(getDate(count).slice(0, -2)));
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
          <MdKeyboardArrowLeft
            style={{ fontSize: "30px", verticalAlign: "middle" }}
          />
        </button>
        <StyledSpan>{getDate(count)}</StyledSpan>
        <button type="button" onClick={clickNext}>
          <MdKeyboardArrowRight
            style={{ fontSize: "30px", verticalAlign: "middle" }}
          />
        </button>
        <div style={{ marginLeft: "auto" }}>
          {getToken() && <GoogleLoginButton />}
        </div>
      </StyledButtonWrapper>
    </StyledHead>
  );
};

export default Head;
