"use client";

import { useState } from "react";
import ButtonPrimary from "../sub/ButtonPrimary";
import { MessageService } from "@/app/service/Services";

export default function ContactForm() {
  const [sender, setSender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const service = new MessageService();

  const validateInputs = () => {
    if (
      sender.trim().length < 3 ||
      /\d/.test(sender) ||
      /[^a-zA-Z\s]/.test(sender)
    ) {
      setMessage(
        "Nome inválido. Deve conter no mínimo três caracteres, sem números e símbolos que não sejam espaço."
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Email inválido. Use o formato xxx@xxxx.com");
      return false;
    }

    if (description.length < 20) {
      setMessage("Mensagem muito curta. Deve conter no mínimo 20 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateInputs()) return;
    service
      .insert({
        sender: sender,
        email: email,
        phone: phone,
        description: description,
      })
      .then(function (response) {
        setSuccess(response.statusText);
        setMessage("Mensagem enviada!");
        setSender("");
        setEmail("");
        setPhone("");
        setDescription("");
      })
      .catch(function (error) {
        console.error(error);
        setMessage("Falha ao enviar mensagem.");
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="desc">Nome</label>
          <input
            onChange={(e) => setSender(e.target.value)}
            value={sender}
            type="text"
            id="sender"
            placeholder="Nome Completo"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            autoComplete="email"
            id="email"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone (DDD + número)</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            id="phone"
            maxLength={11}
            placeholder="XXXXXXXXXXX"
          />
        </div>

        <div>
          <label htmlFor="description">Mensagem</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="h-32"
            id="description"
            placeholder="Insira sua mensagem aqui..."
          ></textarea>
        </div>
        <ButtonPrimary type="submit">Enviar</ButtonPrimary>
      </form>

      <div className="bg-slate-100 flex flex-col">
        <div
          className={`${
            success === "CREATED" ? "text-green-800" : "text-red-600"
          } px-5 py-2`}
        >
          {message}
        </div>
      </div>
    </>
  );
}
