"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RulesModal from "../components/RulesModal";
import AfterRegisterModal from "../components/AfterRegisterModal";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [login, setLogin] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!birthDate) {
      setError("Укажите дату рождения");
      return;
    }

    if (!rulesAccepted) {
      setError("Необходимо принять правила клуба");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        surname,
        phone,
        birthDate,
        rulesAccepted,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Ошибка регистрации");
      setLoading(false);
      return;
    }

    setLogin(data.login);
    setSuccessOpen(true);
  }

  return (
    <>
      <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />

      <AfterRegisterModal
        open={successOpen}
        login={login}
        onContinue={() => router.push("/pcs")}
      />

      <div className="registerPage">
        <form className="registerCard" onSubmit={handleSubmit}>
          <h1>Регистрация</h1>

          <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} required />
          <input placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required />

          <label className="dateLabel">
            Дата рождения
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              required
            />
          </label>

          {/* VPN WARNING */}
          <div className="vpnWarning">
            ⚠️ Рекомендуем отключить VPN перед регистрацией.
            Это необходимо для корректной отправки уведомлений администратору.
          </div>

          <label className="rulesRow">
            <input
              type="checkbox"
              checked={rulesAccepted}
              onChange={e => setRulesAccepted(e.target.checked)}
            />
            <span>
              Я ознакомлен с{" "}
              <span
                className="rulesLink"
                onClick={() => setRulesOpen(true)}
              >
                правилами клуба
              </span>
            </span>
          </label>

          {error && <div className="registerError">{error}</div>}

          <button className="submitButton" disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </>
  );
}
