import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const CustomButton = ({ text }) => {
  return (
    <button className="flex items-center w-full justify-center gap-3 rounded group text-white bg-blue-500 hover:bg-green-400 py-2.5 px-10 ">
      <span>{text ?? "Fancy Button"}</span>
      <div className="flex items-center gap-1 group-hover:translate-x-2 transition-all duration-300 ease-in-out">
        <MdOutlineKeyboardDoubleArrowRight />
      </div>
    </button>
  );
};

export default CustomButton;