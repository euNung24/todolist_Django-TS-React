import React, { useState } from "react";

import CheckButton from "./CheckButton";
import DeleteButton from "./DeleteButton";
import { StyledLi } from "../styles/ListItemStyle";

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
      <CheckButton check={isFinished} id={id} />
      {todo}
      {showDelete ? <DeleteButton id={id} /> : null}
    </StyledLi>
  );
};

export default ListItem;
