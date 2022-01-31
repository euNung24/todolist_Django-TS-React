import React, { useRef } from "react";
import axios from "axios";
import moment from "moment";

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo = inputRef.current!.value;
    axios.post("/todolist/", {
      todo: todo,
      date: moment().locale("ko").format("L"),
      isFinished: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo"></label>
      <input type="text" id="todo" ref={inputRef} />
      <button type="submit">확인</button>
    </form>
  );
};

export default Input;
