import ContactForm from '@/components/main/ContactForm';
import React from 'react'

export default function Page() {
  return (
    <div className="p-4 mt-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Fale conosco</h1>
      <p>Para entrar em contato, preencha o formulário abaixo.</p>
      <ContactForm />
    </div>
  );
}