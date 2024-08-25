import React from "react";
const Footer = () => {
  return (
    <div className="bg-white py-5">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 flex justify-center">
        <div className="flex">
          <p className="text-black justify-start sm:justify-center">
            ©{new Date().getFullYear()} Medical Appointment Booking - Victor
            Brito.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
