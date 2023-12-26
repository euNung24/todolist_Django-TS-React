import React from "react";
import { RiLogoutBoxRFill } from "@react-icons/all-files/ri/RiLogoutBoxRFill";
import { removeToken } from "../../utils";

export default function UserNav() {
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
        src={localStorage.getItem("picture")!}
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
          removeToken();
          location.reload();
        }}
      />
    </div>
  );
}
