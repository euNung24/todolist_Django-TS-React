import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoThunk } from "../actions/TodoActions";
import { ListTypes } from "./Body";
import { initState, TodoState } from "./Todolist";

import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

interface DeleteBtnProps {
  id: number;
}

const StyledButton = styled.button`
  margin-left: auto;
  &:hover {
    color: #d93d4e;
  }
`;

const DeleteButton = ({ id }: DeleteBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<number>(id);

  const dispatch = useDispatch();
  const { todolist } = useSelector((state: TodoState) => ({
    todolist: state.todolist.todolist,
  }));

  const handleClick = () => {
    console.log(ref.current);
    const todo: ListTypes = todolist[+ref.current];
    deleteTodoThunk(dispatch, () => initState, { id: ref.current, todo });
  };

  return (
    <StyledButton type="button" onClick={handleClick} ref={buttonRef}>
      <FaTrashAlt style={{ fontSize: "20px" }} />
    </StyledButton>
  );
};

export default DeleteButton;
