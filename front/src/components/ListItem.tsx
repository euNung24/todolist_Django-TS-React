import React, { useRef, useState } from "react";
import { updateTodoThunk } from "../actions/TodoActions";
import { TodoState } from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import { StyledLi } from "../styles/ListItemStyle";
import { BiCheckbox } from "@react-icons/all-files/bi/BiCheckbox";
import { BiCheckboxChecked } from "@react-icons/all-files/bi/BiCheckboxChecked";
import { TodoType } from "../types/apiTypes";

const ListItem = ({ isFinished, todo, id }: Omit<TodoType, "date">) => {
  const isMouseOver = useRef<boolean>(false);
  const [check, setCheck] = useState<boolean>(isFinished);
  const dispatch = useDispatch();
  const user = useSelector((state: TodoState) => state.user);

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
    updateTodoThunk(dispatch, () => user, { id, isFinished: check }).then(
      (data) => {
        if (!data) return;
        setCheck((prev) => data.isFinished);
        isMouseOver.current = false;
      },
    );
  };

  return (
    <StyledLi>
      <button
        type="button"
        className="btn-finish"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {check ? (
          <BiCheckboxChecked
            style={{ fontSize: "30px", verticalAlign: "middle" }}
          />
        ) : (
          <BiCheckbox style={{ fontSize: "30px", verticalAlign: "middle" }} />
        )}
      </button>
      {todo}
      <DeleteButton id={id} />
    </StyledLi>
  );
};

export default ListItem;
