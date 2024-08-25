import React from "react";
import "./Spinner.css";

type LOADER_PROPS = {
  size?: string | number;
  className?: string;
  invertColor?: boolean;
};

const Loader = React.memo(
  ({ size, className = "", invertColor = false }: LOADER_PROPS) => {
    const sizes: { [key: string]: string } = {
      small: "1.5rem",
      normal: "2.5rem",
      large: "3.75rem",
    };

    const loaderSize =
      typeof size === "string" && !!sizes[size]
        ? sizes[size]
        : typeof size === "string" && !sizes[size] && !isNaN(parseInt(size))
        ? `${parseInt(size)}px`
        : typeof size === "number"
        ? `${size}px`
        : sizes.normal;

    const baseStyle = !invertColor
      ? "bg-white border-blue-100 border-t-blue-500"
      : "bg-transparent border-white border-t-blue-500";

    return (
      <div
        // className={`h-[${loaderSize}px] w-[${loaderSize}px] bg-white border-blue-100 border-t-blue-500 border-4 rounded-[50%] animate-spin`}

        style={{ width: loaderSize, height: loaderSize }}
        className={`${baseStyle} border-2 rounded-[50%] animate-spin ${className}`}
      ></div>
    );
  }
);

export default Loader;
