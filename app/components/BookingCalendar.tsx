"use client";
import { useState } from "react";

type Props = {
  value: string | null;
  onChange: (date: string) => void;
};

export default function BookingCalendar({ value, onChange }: Props) {
  const today = new Date();
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isPast = (d: number) => {
    const date = new Date(year, month, d);
    return date < new Date(today.toDateString());
  };

  const format = (d: number) =>
    new Date(year, month, d).toISOString().split("T")[0];

  return (
    <div className="calendarBox">
      <div className="calendarHeader">
        <button
          disabled={
            month === today.getMonth() && year === today.getFullYear()
          }
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
        >
          ‹
        </button>

        <span>
          {current.toLocaleString("ru-RU", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <button onClick={() => setCurrent(new Date(year, month + 1, 1))}>
          ›
        </button>
      </div>

      <div className="calendarGrid">
        {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => (
          <div key={d} className="weekDay">{d}</div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const val = format(day);

          return (
            <button
              key={day}
              className={`calendarDay
                ${value === val ? "active" : ""}
                ${isPast(day) ? "disabled" : ""}
              `}
              disabled={isPast(day)}
              onClick={() => onChange(val)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
