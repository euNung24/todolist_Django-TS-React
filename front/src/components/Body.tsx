import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "./Input";
import { TodoState } from "./Todolist";
import ListItem from "./ListItem";

const StyledBody = styled.section`
  height: calc(100% - 120px);
  background: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
`;

const StyledH3 = styled.h3`
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
`;

export interface ListTypes {
  id?: number;
  todo: string;
  date: string;
  isFinished: boolean;
}

const Body = () => {
  const { ids, todolist } = useSelector((state: TodoState) => ({
    ids: state.todolist.ids,
    todolist: state.todolist.todolist,
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
      <Input />
    </StyledBody>
  );
};

export default Body;
