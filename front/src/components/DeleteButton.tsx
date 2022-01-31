import axios from "axios";
import React, { useRef } from "react";

interface DeleteBtnProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteBtnProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    console.log(buttonRef.current!.id);
    axios.delete(`/todolist/${buttonRef.current!.id}`);
  };

  return (
    <button type="button" onClick={handleClick} ref={buttonRef} id={id}>
      삭제
    </button>
  );
};

export default DeleteButton;
