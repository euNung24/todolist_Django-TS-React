import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoThunk } from "../actions/TodoActions";
import { ListTypes } from "./Body";
import { initState, TodoState } from "./Todolist";

interface DeleteBtnProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<string>(id);

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
    <button type="button" onClick={handleClick} ref={buttonRef}>
      삭제
    </button>
  );
};

export default DeleteButton;
