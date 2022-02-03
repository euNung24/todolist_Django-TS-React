import React, { useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { updateTodoThunk } from "../actions/TodoActions";
import { useDispatch } from "react-redux";
import { initState } from "./Todolist";
import styled from "styled-components";

type CheckButtonProps = {
  check: boolean;
  id: number;
};

const StyledButton = styled.button`
  &:hover {
    color: #5e5955;
  }
`;

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
    <StyledButton
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {isCheck ? <BiCheckboxChecked /> : <BiCheckbox />}
    </StyledButton>
  );
};

export default CheckButton;
