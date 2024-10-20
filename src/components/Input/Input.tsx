import React from "react";

type INPUT_PROPS = {
  label: string;
  error: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

{
  /* TODO: add view password icon */
}

const Input = React.memo(
  ({
    label,
    name,
    id,
    value,
    type = "text",
    error = "",
    onChange,
    ...rest
  }: INPUT_PROPS) => {
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
        {!!error && <p className="text-red-800 ">{error}</p>}
      </div>
    );
  }
);

export default Input;
