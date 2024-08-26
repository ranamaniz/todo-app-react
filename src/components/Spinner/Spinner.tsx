import React from "react";
import "./Spinner.css";

type SPINNER_PROPS = {
  size?: string | number;
  className?: string;
  invertColor?: boolean;
};

const Spinner = React.memo(
  ({ size, className = "", invertColor = false }: SPINNER_PROPS) => {
    const sizes: { [key: string]: string } = {
      small: "1.25rem",
      normal: "2.5rem",
      large: "3.75rem",
    };

    const spinnerSize =
      typeof size === "string" && !!sizes[size]
        ? sizes[size]
        : typeof size === "string" && !sizes[size] && !isNaN(parseInt(size))
        ? `${parseInt(size)}px`
        : typeof size === "number"
        ? `${size}px`
        : sizes.normal;

    const baseStyle = !invertColor
      ? "bg-white border-blue-100 border-t-blue-500"
      : "bg-transparent border-white border-t-gray-400";

    return (
      <div
        // className={`h-[${spinnerSize}px] w-[${spinnerSize}px] bg-white border-blue-100 border-t-blue-500 border-4 rounded-[50%] animate-spin`}

        style={{ width: spinnerSize, height: spinnerSize }}
        className={`${baseStyle} border-2 rounded-[50%] animate-spin ${className}`}
      ></div>
    );
  }
);

export default Spinner;
