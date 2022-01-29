import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./Input";

const StyledBody = styled.section`
  background: #f2f2f2;
`;

interface ListTypes {
  todo: string;
  date: string;
  isFinished: boolean;
}

const getData = async () => {
  const response = axios.get<ListTypes>("/todolist");
  return (await response).data;
};

const Body = () => {
  const [lists, setLists] = useState<ListTypes[]>([]);
  useEffect(() => {
    axios.get<ListTypes[]>("/todolist").then((res) => setLists(res.data));
  }, []);
  return (
    <StyledBody>
      {lists.map((list) => (
        <li key={list.todo}>{list.todo}</li>
      ))}
      <Input />
    </StyledBody>
  );
};

export default Body;
