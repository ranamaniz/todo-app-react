import React, { useId } from "react";

type INPUT_PROPS = {
  label: string;
  error: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

{
  /* TODO: add view password icon */
}

// TODO: use ref
const Input = React.memo(
  ({
    label,
    name,
    id = useId(),
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
          className="rounded-md px-1 py-2 border border-gray-300 focus:border-indigo-500"
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
