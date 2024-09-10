import React from "react";
import { Link } from "react-scroll";
import NavLink from "./NavLink";

interface MenuOverlayProps {
  links: { to: string; title: string }[];
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center sm:hidden">
        <NavLink path="/auth/register" title="Entrar" />
      {links.map((link, index) => (
        <li key={index}>
          <NavLink path={link.to} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
