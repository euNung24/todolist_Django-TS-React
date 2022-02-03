import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoThunk } from "../actions/TodoActions";
import { initState, TodoState } from "./Todolist";
import styled from "styled-components";
import { BiCheckbox } from "react-icons/bi";
import { BsPatchPlusFill } from "react-icons/bs";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  label {
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }
`;

const StyledButton = styled.button`
  margin-left: auto;
  &:hover {
    color: #6440a7;
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  margin-right: 10px;
`;

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { date } = useSelector((state: TodoState) => ({
    date: state.date.date,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo = inputRef.current!.value;
    console.log(date);
    createTodoThunk(dispatch, () => initState, {
      todo,
      date,
      isFinished: false,
    });
    inputRef.current!.value = "";
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <BiCheckbox />
      <label htmlFor="todo">할 일 입력</label>
      <StyledInput
        type="text"
        id="todo"
        ref={inputRef}
        placeholder="할 일을 입력하세요."
      />
      <StyledButton type="submit">
        <BsPatchPlusFill style={{ fontSize: "20px" }} />
      </StyledButton>
    </StyledForm>
  );
};

export default Input;
