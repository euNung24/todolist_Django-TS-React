import styled from "styled-components";

export const StyledHead = styled.header`
  height: 120px;
  background: #b496c3;
  padding: 30px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledH2 = styled.h2`
  font-size: 42px;
  font-family: "Rowdies", cursive;
  text-align: center;
`;

type SpanProps = {
  day: boolean;
};

export const StyledSpan = styled.span<SpanProps>`
  font-family: "Black Han Sans", sans-serif;
  font-size: 18px;
`;

export const StyledButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
`;
