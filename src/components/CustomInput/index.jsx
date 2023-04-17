import React from "react";

const CustomInput = ({
  type,
  placeholder,
  defaultValue,
  label,
  onChange,
  props,
}) => {
  return (
    <div>
      {label ? <label className="font-medium">{label}</label> : null}
      <input
        className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
        placeholder={placeholder}
        // defaultValue={defaultValue ?? ''}
        type={type ?? "text"}
        onChange={onChange ? onChange : null}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
