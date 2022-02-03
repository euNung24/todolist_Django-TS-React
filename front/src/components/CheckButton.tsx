import React, { useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { updateTodoThunk } from "../actions/TodoActions";
import { useDispatch } from "react-redux";
import { initState } from "./Todolist";
import { StyledCheckButton } from "../styles/ButtonStyle";

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
    <StyledCheckButton
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {isCheck ? <BiCheckboxChecked /> : <BiCheckbox />}
    </StyledCheckButton>
  );
};

export default CheckButton;
