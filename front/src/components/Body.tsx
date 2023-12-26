import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import { TodoState } from "./Todolist";
import GoogleLoginButton from "./GoogleLoginButton";
import { StyledBody, StyledH3 } from "../styles/BodyStyle";
import ListItem from "./ListItem";

const Body = () => {
  const { ids, todolist, errMsg } = useSelector(
    (state: TodoState) => state.todolist,
  );
  const { token } = useSelector((state: TodoState) => state.user);
  const lists = ids.map((id) => todolist[id]);

  useEffect(() => {
    errMsg && alert(errMsg);
  });
  return (
    <StyledBody>
      <StyledH3>To do List 목록</StyledH3>
      {token ? (
        <>
          <ul>
            {lists.map((list) => (
              <ListItem
                key={list.id}
                isFinished={list.isFinished}
                todo={list.todo}
                id={list.id}
              />
            ))}
          </ul>
          <Input />
        </>
      ) : (
        <GoogleLoginButton />
      )}
    </StyledBody>
  );
};

export default Body;
