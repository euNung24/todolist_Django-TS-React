import styled from "styled-components";

export const StyledLi = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-family: "Gamja Flower", cursive;
  font-size: 20px;
  &:hover,
  &:hover > * {
    color: #5e5955;
  }
  cursor: pointer;
`;
