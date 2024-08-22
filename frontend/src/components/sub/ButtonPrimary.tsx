import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  addClass?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  addClass,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg  bg-[#478DF7] hover:bg-blue-800 transition-all outline-none " +
        (addClass || "")
      }
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
