import ContactForm from "@/components/main/ContactForm";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import React from "react";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="p-4 mt-24 max-w-3xl mx-auto">
        <ContactForm />
      </div>
    </>
  );
}
