import React, { useState } from "react";
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
  const [color, setColor] = useState<string>("");
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsCheck(!check);
    setColor("#5E5955");
  };

  const handleMouseLeave = () => {
    setIsCheck(check);
    setColor("");
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
      {isCheck ? (
        <BiCheckboxChecked color={color} />
      ) : (
        <BiCheckbox color={color} />
      )}
    </button>
  );
};

export default CheckButton;
