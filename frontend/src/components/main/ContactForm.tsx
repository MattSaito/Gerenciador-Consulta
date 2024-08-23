"use client";

import { useState } from "react";
import ButtonPrimary from "../sub/ButtonPrimary";
import { MessageService } from "@/app/service/MessageService";

export default function ContactForm() {
    const [sender, setSender] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [message, setMessage] = useState<any>("");
    const service = new MessageService();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    service.insert(
      {
        sender: sender,
        email: email,
        phone: phone,
        desc: desc
      }
    ).then(function (response) {
      setSuccess(response.statusText);
      setMessage("Mensagem enviada!");
      setSender("");
      setEmail("");
      setPhone("");
      setDesc("");
    }).catch(function (error) {
      console.error(error)
      setMessage("Falha ao enviar mensagem.")
    })
    }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Nome</label>
          <input
            onChange={(e) => setSender(e.target.value)}
            value={sender}
            type="text"
            id="fullname"
            placeholder="Nome Completo"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            id="phone"
            placeholder="+55 (xx) xxxxx-xxxx"
          />
        </div>

        <div>
          <label htmlFor="message">Mensagem</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="h-32"
            id="message"
            placeholder="Insira sua mensagem aqui..."
          ></textarea>
        </div>
        <ButtonPrimary type="submit">
        Enviar
        </ButtonPrimary>
    
      </form>

      <div className="bg-slate-100 flex flex-col">
        <div
              className={`${
                success === 'CREATED' ? "text-green-800" : "text-red-600"
              } px-5 py-2`}
            >
              {message}
            </div>
      </div>
    </>
  );
}