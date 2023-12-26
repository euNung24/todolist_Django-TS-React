import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoThunk } from "../actions/TodoActions";
import { TodoState } from "./Todolist";
import { BiCheckbox } from "@react-icons/all-files/bi/BiCheckbox";
import { BsPlusSquareFill } from "@react-icons/all-files/bs/BsPlusSquareFill";
import { StyledButton, StyledForm, StyledInput } from "../styles/InputStyle";

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { date } = useSelector((state: TodoState) => state.date);
  const user = useSelector((state: TodoState) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo = inputRef.current!.value;
    createTodoThunk(dispatch, () => user, {
      todo,
      date: date + ".",
      isFinished: false,
    });
    inputRef.current!.value = "";
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <BiCheckbox style={{ fontSize: "30px", verticalAlign: "middle" }} />
      <label htmlFor="todo">할 일 입력</label>
      <StyledInput
        type="text"
        id="todo"
        ref={inputRef}
        placeholder="할 일을 입력하세요."
      />
      <StyledButton type="submit">
        <BsPlusSquareFill
          style={{ fontSize: "20px", verticalAlign: "middle" }}
        />
      </StyledButton>
    </StyledForm>
  );
};

export default Input;
