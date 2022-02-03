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
  color: #5e5955;
  &:hover {
    color: #d93d4e;
  }
`;

const DeleteButton = ({ id }: DeleteBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef<number>(id);

  const dispatch = useDispatch();
  const { todolist } = useSelector((state: TodoState) => ({
    todolist: state.todolist.todolist,
  }));

  const handleClick = () => {
    console.log(idRef.current);
    const todo: ListTypes = todolist[idRef.current];
    deleteTodoThunk(dispatch, () => initState, { id: idRef.current, todo });
  };

  return (
    <StyledButton type="button" onClick={handleClick} ref={buttonRef}>
      <FaTrashAlt style={{ fontSize: "20px" }} />
    </StyledButton>
  );
};

export default DeleteButton;
