import React from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import { TodoState } from "./Todolist";
import ListItem from "./ListItem";

import { StyledBody, StyledH3 } from "../styles/BodyStyle";

const Body = () => {
  const { ids, todolist, errMsg } = useSelector((state: TodoState) => state.todolist);
  const lists = ids.map((id) => todolist[id]);

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
