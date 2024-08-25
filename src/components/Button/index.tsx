import React from "react";
import Loader from "../Input/Loader";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
};

const Button = React.memo(
  ({ children, onClick, isLoading = false }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-md"
      >
        <span className="flex justify-between gap-2">
          {children}
          {isLoading && <Loader size="small" invertColor />}
        </span>
      </button>
    );
  }
);

export default Button;
