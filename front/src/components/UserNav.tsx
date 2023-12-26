import React from "react";
import { RiLogoutBoxRFill } from "@react-icons/all-files/ri/RiLogoutBoxRFill";
import { useDispatch, useSelector } from "react-redux";
import { TodoState } from "./Todolist";
import { deleteUser } from "../actions/UserActions";

export default function UserNav() {
  const { profileImg } = useSelector((state: TodoState) => state.user);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginBottom: "8px",
      }}
    >
      <img
        src={profileImg}
        alt="profile-image"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
        }}
      />
      <RiLogoutBoxRFill
        title="로그아웃"
        style={{
          marginLeft: "4px",
          fontSize: "28px",
          cursor: "pointer",
        }}
        onClick={() => {
          dispatch(deleteUser());
        }}
      />
    </div>
  );
}
