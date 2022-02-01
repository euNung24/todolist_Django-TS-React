import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setTodoThunk } from "../actions/TodoActions";
import DeleteButton from "./DeleteButton";
import Input from "./Input";
import { initState, TodoState } from "./Todolist";

const StyledBody = styled.section`
  background: #f2f2f2;
`;

export interface ListTypes {
  id?: number;
  todo: string;
  date: string;
  isFinished: boolean;
}

const Body = () => {
  const dispatch = useDispatch();
  const { ids, todolist, date } = useSelector((state: TodoState) => ({
    ids: state.todolist.ids,
    todolist: state.todolist.todolist,
    date: state.date.date,
  }));
  const lists = ids.map((id) => todolist[id]);
  console.log(ids, todolist);

  return (
    <StyledBody>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            {list.todo}
            <DeleteButton id={list.id!.toString()} />
          </li>
        ))}
      </ul>
      <Input />
    </StyledBody>
  );
};

export default Body;
