import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      pcName,
      pcType,
      date,
      time,
      packageTitle,
      price,
    } = body;

    // 🔒 ЖЁСТКАЯ ВАЛИДАЦИЯ (чтобы не было 400 без причины)
    if (
      !name ||
      !phone ||
      !pcName ||
      !pcType ||
      !date ||
      time === undefined ||
      !packageTitle ||
      !price
    ) {
      return NextResponse.json(
        { error: "Некорректные данные бронирования" },
        { status: 400 }
      );
    }

    // 🔎 Проверка ENV (ОЧЕНЬ ВАЖНО)
    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.ADMIN_EMAIL
    ) {
      console.error("❌ SMTP ENV MISSING", {
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS ? "OK" : "MISSING",
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      });

      return NextResponse.json(
        { error: "Почта временно недоступна" },
        { status: 500 }
      );
    }

    // ✉️ ТРАНСПОРТ
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📧 ПИСЬМО АДМИНУ (КРАСИВОЕ)
    const mailHtml = `
      <div style="font-family:Arial,sans-serif; background:#0b1220; padding:20px; color:#fff">
        <h2 style="color:#22c55e;">Новая бронь в ToxicSkill</h2>
        <p><b>Имя:</b> ${name}</p>
        <p><b>Телефон:</b> ${phone}</p>
        <hr />
        <p><b>ПК:</b> ${pcName}</p>
        <p><b>Тип:</b> ${pcType.toUpperCase()}</p>
        <p><b>Дата:</b> ${date}</p>
        <p><b>Время:</b> ${String(time).padStart(2, "0")}:00</p>
        <p><b>Пакет:</b> ${packageTitle}</p>
        <h3 style="color:#22c55e;">Сумма: ${price} BYN</h3>
      </div>
    `;

    await transporter.sendMail({
      from: `"ToxicSkill Booking" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "🟢 Новая бронь — ToxicSkill",
      html: mailHtml,
    });

    // ✅ УСПЕХ
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ BOOKING ERROR:", err);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
