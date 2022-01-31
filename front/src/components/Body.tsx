import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setTodoThunk } from "../actions/TodoActions";
import DeleteButton from "./DeleteButton";
import Input from "./Input";
import { TodoState } from "./Todolist";

const StyledBody = styled.section`
  background: #f2f2f2;
`;

export interface ListTypes {
  id: number;
  todo: string;
  date: string;
  isFinished: boolean;
}

const Body = () => {
  const dispatch = useDispatch();
  const { ids, todolist } = useSelector((state: TodoState) => ({
    ids: state.ids,
    todolist: state.todolist,
  }));
  const lists = ids.map((id) => todolist[id]);
  console.log(ids, todolist);
  useEffect(() => {
    dispatch(setTodoThunk());
  }, []);

  return (
    <StyledBody>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            {list.todo}
            <DeleteButton id={list.id.toString()} />
          </li>
        ))}
      </ul>
      <Input />
    </StyledBody>
  );
};

export default Body;
