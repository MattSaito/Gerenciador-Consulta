"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonOutline from "../sub/buttons/ButtonOutline";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "../sub/nav/MenuOverlay";
import logo from "../../../public/logo.svg"

const navLinks = [
  {
    to: "/",
    title: "Sobre",
  },
  {
    to: "/contact",
    title: "Contato",
  },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);


  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);

  return (
    <>
      <nav
        className={
          "w-full bg-white fixed top-0 z-30 transition-all px-5 sm:grid sm:grid-flow-col py-5 sm:py-4 flex-col sm:justify-normal" +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <div className="col-start-1  col-end-2 flex items-center h-10 w-auto justify-between sm:justify-normal">
          <div className="flex items-center">
            <Link href="/">
            <Image src={logo} alt="logo" width={70} height={70}/>
            </Link>
            <h1 className="text-black-600 ml-2 text-lg">
              Global Hospital
            </h1>
          </div>
          <div className="mobile-menu flex md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded border-[#478DF7] text-[#478DF7] hover:text-black hover:border-black"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded  border-[#478DF7] text-[#478DF7] hover:text-black hover:border-black"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        <div className="menu hidden md:flex justify-between">
          <div>
            <ul className="hidden sm:flex text-black text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black hover:text-[#478DF7]"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>
          <div className="gap-5 text-lg flex items-center">
            <Link
              href="/auth/sign-in"
              className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-[#478DF7] transition-all"
            >
              Entrar
            </Link>
            <ButtonOutline>
              <Link href="/auth/sign-up">Cadastrar</Link>
            </ButtonOutline>
          </div>
        </div>
        {navbarOpen ? (
          <div className="justify-center md:hidden">
            <MenuOverlay links={navLinks} />
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;