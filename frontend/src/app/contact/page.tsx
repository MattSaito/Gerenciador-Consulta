import ContactForm from "@/components/main/ContactForm.1";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import React from "react";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="p-4 mt-24 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Fale conosco</h1>
        <p>Para entrar em contato, preencha o formulário abaixo.</p>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
