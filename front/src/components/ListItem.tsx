import React, { useState } from "react";
import styled from "styled-components";

import CheckButton from "./CheckButton";
import DeleteButton from "./DeleteButton";

const StyledLi = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

type ListItemProps = {
  isFinished: boolean;
  todo: any;
  id: number;
};

const ListItem = ({ isFinished, todo, id }: ListItemProps) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setShowDelete(true);
  };

  const handleMouseLeave = () => {
    setShowDelete(false);
  };
  return (
    <StyledLi onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CheckButton check={isFinished} />
      {todo}
      {showDelete ? <DeleteButton id={id} /> : null}
    </StyledLi>
  );
};

export default ListItem;
