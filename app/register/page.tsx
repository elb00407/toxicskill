"use client";

import { useState } from "react";
import AfterRegisterModal from "../components/AfterRegisterModal";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!firstName || !lastName || !phone) {
      setError("Заполните все поля");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      // ✅ СОХРАНЯЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
      localStorage.setItem(
        "userName",
        `${firstName} ${lastName}`
      );
      localStorage.setItem("userPhone", phone);

      setSuccess(true);
    } catch {
      setError("Ошибка регистрации. Попробуйте позже.");
    }
  };

  return (
    <div className="registerWrapper">
      <div className="registerCard">
        <h1>Регистрация</h1>

        <input
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && <div className="formError">{error}</div>}

        <button className="submitButton" onClick={handleRegister}>
          Зарегистрироваться
        </button>
      </div>

      {success && <AfterRegisterModal />}
    </div>
  );
}
