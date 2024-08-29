import React from 'react';
import logo from "../../../../public/logo.svg";
import Image
 from 'next/image';
import Link from 'next/link';
const AuthNav = () => {
  return (
    <nav
    className={
      "w-full bg-white fixed top-0 z-30 transition-all px-5 sm:grid sm:grid-flow-col py-5 sm:py-4 flex-col justify-normal"
    }
  >
    <div className="col-start-1  col-end-2 flex items-center h-10 w-auto justify-between sm:justify-normal">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={70} height={70} />
        </Link>
        <h1 className="text-black-600 ml-2 text-lg">Global Hospital</h1>
      </div>
    </div>
  </nav>
  )
}

export default AuthNav