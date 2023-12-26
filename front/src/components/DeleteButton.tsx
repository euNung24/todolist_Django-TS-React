import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoThunk } from "../actions/TodoActions";
import { TodoState } from "./Todolist";

import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";
import { StyledDeleteButton } from "../styles/ButtonStyle";
import { TodoType } from "../types/apiTypes";

type DeleteBtnProps = {
  id: number;
};

const DeleteButton = ({ id }: DeleteBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef<number>(id);

  const dispatch = useDispatch();
  const { todolist } = useSelector((state: TodoState) => state.todolist);
  const user = useSelector((state: TodoState) => state.user);

  const handleClick = () => {
    const todo: TodoType = todolist[idRef.current];
    deleteTodoThunk(dispatch, () => user, { id: idRef.current, todo });
  };

  return (
    <StyledDeleteButton
      className="btn-delete"
      type="button"
      onClick={handleClick}
      ref={buttonRef}
    >
      <FaTrashAlt style={{ fontSize: "20px" }} />
    </StyledDeleteButton>
  );
};

export default DeleteButton;
