import React from "react";

type INPUT_PROPS = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.memo(
  ({
    label,
    name,
    id,
    value,
    type = "text",
    onChange,
    ...rest
  }: INPUT_PROPS) => {
    console.log("name", name);
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        <input
          className="rounded-sm px-1 py-2 focus:border-none "
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
