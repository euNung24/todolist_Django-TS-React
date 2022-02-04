import React from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import { TodoState } from "./Todolist";
import ListItem from "./ListItem";

import { StyledBody, StyledH3 } from "../styles/BodyStyle";

export type ListTypes = {
  id?: number;
  todo: string;
  date: string;
  isFinished: boolean;
};

const Body = () => {
  const { ids, todolist, errMsg } = useSelector((state: TodoState) => ({
    ids: state.todolist.ids,
    todolist: state.todolist.todolist,
    errMsg: state.todolist.errMsg,
  }));
  const lists = ids.map((id) => todolist[id]);
  console.log(ids, todolist);

  return (
    <StyledBody>
      <StyledH3>To do List 목록</StyledH3>
      <ul>
        {lists.map((list) => (
          <ListItem
            key={list.id}
            isFinished={list.isFinished}
            todo={list.todo}
            id={list.id!}
          />
        ))}
      </ul>
      {errMsg && <p>{errMsg}</p>}
      <Input />
    </StyledBody>
  );
};

export default Body;
