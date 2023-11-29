import styled from "styled-components";

export const StyledLi = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-family: "Gamja Flower", cursive;
  font-size: 20px;
  cursor: default;
  & > div {
    flex: 1;
    display: flex;
    align-items: center;
  }
  & .btn-finish:hover {
    color: #5e5955;
    cursor: pointer;
  }
  .btn-delete {
    display: none;
  }
  &:hover .btn-delete {
    display: block;
    color: #5e5955;
    cursor: pointer;
  }
`;
