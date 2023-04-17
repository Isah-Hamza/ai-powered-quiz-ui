import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CustomPasswordInput = ({ props, id, label, onChange }) => {
  const [type, setType] = useState("password");

  const handleChangeType = () => {
    if (type === "text") setType("password");
    else setType("text");
  };

  return (
    <div>
      {label ? <label className="font-medium">{label}</label> : null}
      <div className="relative">
        <input
          className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
          placeholder={"******"}
          type={type}
          id={id}
          onChange={onChange}
          {...props}
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-2">
          {type === "password" ? (
            <FiEyeOff onClick={handleChangeType} />
          ) : (
            <FiEye onClick={handleChangeType} />
          )}
        </span>
      </div>
    </div>
  );
};

export default CustomPasswordInput;
