import React, { useRef, useState } from "react";
import { updateTodoThunk } from "../actions/TodoActions";
import { initState, TodoState } from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import { StyledLi } from "../styles/ListItemStyle";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { TodoType } from "../types/apiTypes";

const ListItem = ({ isFinished, todo, id }: Omit<TodoType, "date">) => {
  const DeleteRef = useRef<boolean>(false);
  const [check, setCheck] = useState<boolean>(isFinished);
  const { date } = useSelector((state: TodoState) => state.date);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    DeleteRef.current = true;
    setCheck(!isFinished);
  };

  const handleMouseLeave = () => {
    DeleteRef.current = false;
    setCheck(isFinished);
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
