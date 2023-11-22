import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoThunk } from "../actions/TodoActions";
import { initState, TodoState } from "./Todolist";

import { FaTrashAlt } from "react-icons/fa";
import { StyledDeleteButton } from "../styles/ButtonStyle";
import { TodoType } from "../types/apiTypes";

type DeleteBtnProps = {
  id: number;
};

const DeleteButton = ({ id }: DeleteBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef<number>(id);

  const dispatch = useDispatch();
  const { todolist, date } = useSelector((state: TodoState) => ({
    todolist: state.todolist.todolist,
    date: state.date.date,
  }));

  const handleClick = () => {
    const todo: TodoType = todolist[idRef.current];
    deleteTodoThunk(dispatch, () => initState, {
      id: idRef.current,
      todo,
      date,
    });
  };

  return (
    <StyledDeleteButton type="button" onClick={handleClick} ref={buttonRef}>
      <FaTrashAlt style={{ fontSize: "20px" }} />
    </StyledDeleteButton>
  );
};

export default DeleteButton;
