"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AfterRegisterModal from "../components/AfterRegisterModal";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
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
        body: JSON.stringify({ firstName, lastName, phone }),
      });

      if (!res.ok) throw new Error();

      // 🔑 Генерация логина
      const cleanPhone = phone.replace(/\D/g, "");
      const userLogin =
        cleanPhone.slice(-4) +
        firstName[0].toUpperCase() +
        lastName[0].toUpperCase();

      // 💾 Сохраняем пользователя
      localStorage.setItem("userName", `${firstName} ${lastName}`);
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("userLogin", userLogin);

      setLogin(userLogin);
      setSuccess(true);
    } catch {
      setError("Ошибка регистрации. Попробуйте позже.");
    }
  };

  return (
    <>
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
      </div>

      {/* ✅ ПРАВИЛЬНЫЙ ВЫЗОВ МОДАЛКИ */}
      <AfterRegisterModal
        open={success}
        login={login}
        onContinue={() => router.push("/pcs")}
      />
    </>
  );
}
