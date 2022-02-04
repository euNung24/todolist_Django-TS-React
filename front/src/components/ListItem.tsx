import React, { useRef } from "react";
import { updateTodoThunk } from "../actions/TodoActions";
import { initState } from "./Todolist";
import { useDispatch } from "react-redux";

import DeleteButton from "./DeleteButton";
import { StyledLi } from "../styles/ListItemStyle";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

type ListItemProps = {
  isFinished: boolean;
  todo: any;
  id: number;
};

const ListItem = ({ isFinished, todo, id }: ListItemProps) => {
  const DeleteRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    DeleteRef.current = true;
  };

  const handleMouseLeave = () => {
    DeleteRef.current = false;
  };

  const handleClick = () => {
    updateTodoThunk(dispatch, () => initState, { id, isFinished });
  };

  return (
    <StyledLi
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <button type="button">
        {isFinished ? <BiCheckboxChecked /> : <BiCheckbox />}
      </button>
      {todo}
      {DeleteRef.current ? <DeleteButton id={id} /> : null}
    </StyledLi>
  );
};

export default ListItem;
