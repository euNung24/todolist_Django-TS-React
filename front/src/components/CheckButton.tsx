import React, { useState } from "react";
import axios from "axios";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { updateTodoThunk } from "../actions/TodoActions";
import { useDispatch } from "react-redux";
import { initState } from "./Todolist";

type CheckButtonProps = {
  check: boolean;
  id: number;
};

const CheckButton = ({ check, id }: CheckButtonProps) => {
  const [isCheck, setIsCheck] = useState<boolean>(check);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsCheck(!check);
  };

  const handleMouseLeave = () => {
    setIsCheck(check);
  };

  const handleClick = () => {
    updateTodoThunk(dispatch, () => initState, { id, isFinished: check });
  };

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {isCheck ? <BiCheckboxChecked /> : <BiCheckbox />}
    </button>
  );
};

export default CheckButton;
