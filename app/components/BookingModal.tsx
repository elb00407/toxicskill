"use client";

import { useState } from "react";
import BookingCalendar from "./BookingCalendar";

type PcType = "standard" | "vip" | "console";

type Step = 1 | 2 | 3 | 4 | 5;

type BookingModalProps = {
  open: boolean;
  pcName: string;
  pcType: PcType;
  onClose: () => void;
};

const PACKAGES = {
  standard: [
    { id: "1h", title: "1 час", price: 6 },
    { id: "3h", title: "3 часа", price: 15, popular: true },
    { id: "5h", title: "5 часов", price: 21 },
    { id: "morning", title: "Утро · 5ч (8–11)", price: 15, from: 8, to: 11 },
    { id: "day", title: "День · 5ч (11–17)", price: 18, from: 11, to: 17 },
    { id: "night", title: "Ночь · 10ч (22–8)", price: 25, from: 22, to: 8, adult: true, popular: true },
  ],
  vip: [
    { id: "1h", title: "1 час", price: 8 },
    { id: "3h", title: "3 часа", price: 20, popular: true },
    { id: "5h", title: "5 часов", price: 25 },
    { id: "morning", title: "Утро · 5ч (8–11)", price: 20, from: 8, to: 11 },
    { id: "day", title: "День · 5ч (11–17)", price: 23, from: 11, to: 17 },
    { id: "night", title: "Ночь · 10ч (22–8)", price: 30, from: 22, to: 8, adult: true, popular: true },
  ],
  console: [
    { id: "1h", title: "1 час", price: 10 },
    { id: "3h", title: "3 часа", price: 25, popular: true },
    { id: "5h", title: "5 часов", price: 40 },
  ],
};

export default function BookingModal({
  open,
  pcName,
  pcType,
  onClose,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const packages = PACKAGES[pcType];

  const canUsePackage = (p: any) => {
    if (!p.from) return true;
    if (time === null) return false;

    if (p.from < p.to) {
      return time >= p.from && time < p.to;
    }
    return time >= p.from || time < p.to;
  };

  const sendBooking = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: localStorage.getItem("userName"),
          phone: localStorage.getItem("userPhone"),
          pcName,
          pcType,
          date,
          time,
          packageTitle: selectedPackage.title,
          price: selectedPackage.price,
        }),
      });

      if (!res.ok) throw new Error();
      setStep(5);
    } catch {
      setError("Не удалось отправить бронь. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard bookingModal" onClick={(e) => e.stopPropagation()}>

        {/* STEPS */}
        <div className="steps">
          {["Дата", "Время", "Пакет", "Подтверждение", "Готово"].map((s, i) => (
            <div key={s} className={step >= i + 1 ? "step active" : "step"}>
              {s}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2>Выберите дату</h2>
            <BookingCalendar value={date} onChange={setDate} />

            <div className="bookingFooter">
              <button className="cancelBtn" onClick={onClose}>Отмена</button>
              <button
                className="submitButton"
                onClick={() => date ? setStep(2) : setError("Выберите дату")}
              >
                Далее
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>Во сколько вы придёте?</h2>
            <div className="clockGrid">
              {Array.from({ length: 24 }).map((_, h) => (
                <button
                  key={h}
                  className={`clock ${time === h ? "active" : ""}`}
                  onClick={() => setTime(h)}
                >
                  {String(h).padStart(2, "0")}:00
                </button>
              ))}
            </div>

            <div className="bookingFooter">
              <button className="cancelBtn" onClick={() => setStep(1)}>Назад</button>
              <button
                className="submitButton"
                onClick={() => time !== null ? setStep(3) : setError("Выберите время")}
              >
                Далее
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2>Выберите пакет</h2>
            <div className="packageGrid compact">
              {packages.map((p: any) => {
                const allowed = canUsePackage(p);
                return (
                  <div
                    key={p.id}
                    className={`packageCard
                      ${selectedPackage?.id === p.id ? "selected" : ""}
                      ${!allowed ? "disabled" : ""}`}
                    onClick={() => allowed && setSelectedPackage(p)}
                  >
                    {p.popular && <div className="fireBadge">🔥 Популярно</div>}
                    <b>{p.title}</b>
                    <span>{p.price} BYN</span>
                    {!allowed && <small>Недоступно в выбранное время</small>}
                  </div>
                );
              })}
            </div>

            <div className="bookingFooter">
              <button className="cancelBtn" onClick={() => setStep(2)}>Назад</button>
              <button
                className="submitButton"
                onClick={() => selectedPackage ? setStep(4) : setError("Выберите пакет")}
              >
                Далее
              </button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2>Подтверждение брони</h2>
            <div className="summary">
              <div>ПК: <b>{pcName}</b></div>
              <div>Тип: <b>{pcType.toUpperCase()}</b></div>
              <div>Дата: <b>{date}</b></div>
              <div>Время: <b>{String(time).padStart(2, "0")}:00</b></div>
              <div>Пакет: <b>{selectedPackage.title}</b></div>
              <div>Стоимость: <b>{selectedPackage.price} BYN</b></div>
            </div>

            <div className="bookingFooter">
              <button className="cancelBtn" onClick={() => setStep(3)}>Назад</button>
              <button
                className="submitButton"
                onClick={sendBooking}
                disabled={loading}
              >
                {loading ? "Отправка..." : "Подтвердить бронь"}
              </button>
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h2>Бронь отправлена 🎉</h2>
            <p className="successText">
              Ваша бронь успешно отправлена администратору.<br />
              Подойдите к администратору для подтверждения и оплаты.
            </p>
            <button className="submitButton" onClick={onClose}>Готово</button>
          </>
        )}

        {error && <div className="formError">{error}</div>}
      </div>
    </div>
  );
}
