import styled from "styled-components";

export const StyledDeleteButton = styled.button`
  margin-left: auto;

  &:hover > * {
    color: #d93d4e;
  }
`;

export const StyledFilterButton = styled.a<{ $active?: boolean }>`
  text-decoration: none;
  padding: 4px;
  background: ${(props) => (props.$active ? "#8a67cc" : "#8d8d8d")};
  border-radius: 4px;
  color: #000;
  font-size: 14px;
  font-family: "Black Han Sans", sans-serif;

  &:hover {
    background: #b496c3;
  }
`;

export const StyledLogoutButton = styled.button`
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover > * {
    color: #d93d4e;
  }
`;

export const StyledAddStickyNoteButton = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;

  &:hover {
    background: #bdbdbd;
    border-radius: 50%;
  }
`;
