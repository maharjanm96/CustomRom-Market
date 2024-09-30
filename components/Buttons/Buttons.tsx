"use client";
import React from "react";

interface CustomButtonProps {
  name: string;
  bgColor: string;
  textColor: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  name,
  bgColor,
  textColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`lg:w-40 lg:h-10 md:w-40 md:h-10 sm:w-24 sm:h-8 w-24 h-8 lg:rounded-md md:rounded-md sm:rounded-md rounded-md border-2 border-black text-sm ${bgColor} ${textColor}`}
    >
      {name}
    </button>
  );
};

export default CustomButton;
