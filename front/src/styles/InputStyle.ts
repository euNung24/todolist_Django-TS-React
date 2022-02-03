import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  label {
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }
`;

export const StyledButton = styled.button`
  margin-left: auto;
  &:hover {
    color: #6440a7;
  }
`;

export const StyledInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  margin-right: 10px;
`;
