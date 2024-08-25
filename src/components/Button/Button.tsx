import React from "react";
import Loader from "../Input/Loader";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.memo(
  ({
    children,
    onClick,
    isLoading = false,
    className,
    ...props
  }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className={`relative bg-blue-500 text-white px-10 py-3 rounded-md box-border  ${
          isLoading ? "bg-gray-400" : ""
        }  ${className ? className : ""}`}
        {...props}
      >
        <span className="flex justify-center gap-2 ">{children}</span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {isLoading && <Loader size="small" invertColor />}
        </span>
      </button>
    );
  }
);

export default Button;
