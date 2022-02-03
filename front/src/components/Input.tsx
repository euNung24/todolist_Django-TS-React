import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoThunk } from "../actions/TodoActions";
import { initState, TodoState } from "./Todolist";
import { BiCheckbox } from "react-icons/bi";
import { BsPatchPlusFill } from "react-icons/bs";
import { StyledForm, StyledInput, StyledButton } from "../styles/InputStyle";

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
      {/* <BiCheckbox /> */}
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
