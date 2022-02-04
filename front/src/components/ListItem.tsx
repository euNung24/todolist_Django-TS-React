import React, { useRef, useState } from "react";
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
  const [check, setCheck] = useState<boolean>(isFinished);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    DeleteRef.current = true;
    setCheck((prev) => !prev);
  };

  const handleMouseLeave = () => {
    DeleteRef.current = false;
    setCheck((prev) => !prev);
  };

  const handleClick = () => {
    updateTodoThunk(dispatch, () => initState, { id, isFinished });
    setCheck((prev) => !prev);
  };

  return (
    <StyledLi onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button type="button" onClick={handleClick}>
        {check ? <BiCheckboxChecked /> : <BiCheckbox />}
      </button>
      {todo}
      {DeleteRef.current ? <DeleteButton id={id} /> : null}
    </StyledLi>
  );
};

export default ListItem;
