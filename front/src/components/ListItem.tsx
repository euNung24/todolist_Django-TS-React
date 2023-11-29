import React, { useRef, useState } from "react";
import { updateTodoThunk } from "../actions/TodoActions";
import { initState, TodoState } from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import { StyledLi } from "../styles/ListItemStyle";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { TodoType } from "../types/apiTypes";

const ListItem = ({ isFinished, todo, id }: Omit<TodoType, "date">) => {
  const isMouseOver = useRef<boolean>(false);
  const [check, setCheck] = useState<boolean>(isFinished);
  const { date } = useSelector((state: TodoState) => state.date);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (isMouseOver.current) return;
    setCheck((prev) => !prev);
    isMouseOver.current = true;
  };

  const handleMouseLeave = () => {
    if (!isMouseOver.current) return;
    setCheck((prev) => !prev);
    isMouseOver.current = false;
  };

  const handleClick = () => {
    updateTodoThunk(dispatch, () => initState, { id, isFinished: check })
      .then(data => {
        setCheck((prev) => data.isFinished);
        isMouseOver.current = false;
      });
  };

  return (
    <StyledLi>
      <button type="button" className="btn-finish" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
        {check ? <BiCheckboxChecked /> : <BiCheckbox />}
      </button>
      {todo}
      <DeleteButton id={id} />
    </StyledLi>
  );
};

export default ListItem;
