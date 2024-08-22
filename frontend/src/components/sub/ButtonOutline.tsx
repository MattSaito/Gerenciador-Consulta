import React, { ReactNode } from "react";

interface ButtonOutlineProps {
  children: ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({ children }) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-[#478DF7]  text-[#478DF7]  bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-[#478DF7] hover:text-white transition-all hidden sm:block">
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;
