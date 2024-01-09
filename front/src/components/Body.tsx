import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import { TodoState } from "./Todolist";
import GoogleLoginButton from "./GoogleLoginButton";
import { StyledBody, StyledH3 } from "../styles/BodyStyle";
import ListItem from "./ListItem";
import { FaFilter } from "@react-icons/all-files/fa/FaFilter";
import { StyledFilterButton } from "../styles/ButtonStyle";
import { IoMdSunny } from "@react-icons/all-files/io/IoMdSunny";
import { IoMoon } from "@react-icons/all-files/io5/IoMoon";
import { FaRegStickyNote } from "@react-icons/all-files/fa/FaRegStickyNote";
import StickyNote from "./StickyNote";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";

const Body = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const FILTER = {
    ALL: "all",
    COMPLETE: "complete",
    INCOMPLETE: "incomplete",
  };
  const { ids, todolist, errMsg } = useSelector(
    (state: TodoState) => state.todolist,
  );
  const { token } = useSelector((state: TodoState) => state.user);
  const list = ids.map((id) => todolist[id]);
  const filter = new URLSearchParams(location.search).get("filter");
  const filteredList = filter
    ? list.filter((item) =>
        filter === FILTER.COMPLETE ? item.isFinished : !item.isFinished,
      )
    : list;

  useEffect(() => {
    errMsg && alert(errMsg);
    if (isDarkMode) {
      document.documentElement.setAttribute("theme", "dark-mode");
    } else {
      document.documentElement.removeAttribute("theme");
    }
    return () => {};
  }, [isDarkMode]);
  return (
    <StyledBody>
      <StyledH3>To do List 목록</StyledH3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <FaFilter />
        <StyledFilterButton href="/" $active={!filter}>
          전체
        </StyledFilterButton>
        <StyledFilterButton
          href={"?filter=" + FILTER.COMPLETE}
          $active={filter === FILTER.COMPLETE}
        >
          완료
        </StyledFilterButton>
        <StyledFilterButton
          href={"?filter=" + FILTER.INCOMPLETE}
          $active={filter === FILTER.INCOMPLETE}
        >
          미완료
        </StyledFilterButton>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
          }}
        >
          <FaRegStickyNote fontSize="20px" style={{}} />
          <BiPlus
            style={{
              position: "absolute",
            }}
          />
        </div>
        <div
          className="theme"
          onClick={() => {
            setIsDarkMode((prev) => !prev);
          }}
        >
          {isDarkMode ? (
            <IoMoon fontSize="20px" />
          ) : (
            <IoMdSunny fontSize="20px" />
          )}
        </div>
      </div>

      {token ? (
        <>
          <ul>
            {filteredList.map((item) => (
              <ListItem
                key={item.id}
                isFinished={item.isFinished}
                todo={item.todo}
                id={item.id}
              />
            ))}
          </ul>
          <Input />
        </>
      ) : (
        <GoogleLoginButton />
      )}
      <StickyNote />
    </StyledBody>
  );
};

export default Body;
