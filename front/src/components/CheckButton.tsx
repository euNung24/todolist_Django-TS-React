import React, { useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

type CheckButtonProps = {
  check: boolean;
};

const CheckButton = ({ check }: CheckButtonProps) => {
  const [isCheck, setIsCheck] = useState<boolean>(check);

  const handleMouseEnter = () => {
    setIsCheck(!check);
  };

  const handleMouseLeave = () => {
    setIsCheck(check);
  };

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isCheck ? <BiCheckboxChecked /> : <BiCheckbox />}
    </button>
  );
};

export default CheckButton;
