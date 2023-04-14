import React from "react";

const CustomInput = ({ type, placeholder, props, id, label }) => {
  return (
    <div>
      {label ? <label className="font-medium">{label}</label> : null}
      <input
        className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
        placeholder={placeholder}
        type={type ?? "text"}
        id={id}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
