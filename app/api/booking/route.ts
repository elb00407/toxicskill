import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      pcName,
      date,
      time,
      packageTitle,
      price,
    } = body;

    // Проверяем ТОЛЬКО реально обязательные данные
    if (!pcName || !date || time === null || !packageTitle || !price) {
      return NextResponse.json(
        { error: "Недостаточно данных для бронирования" },
        { status: 400 }
      );
    }

    // Безопасные значения
    const clientName = name && name.trim() ? name : "Гость (не указано)";
    const clientPhone = phone && phone.trim() ? phone : "Не указано";

    // SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Красивое письмо админу
    const html = `
      <div style="
        background:#0b1220;
        padding:24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial;
        color:#ffffff;
      ">
        <div style="
          max-width:520px;
          margin:0 auto;
          background:linear-gradient(180deg,#0f172a,#020617);
          border-radius:18px;
          padding:24px;
          box-shadow:0 20px 60px rgba(0,0,0,.6);
        ">

          <h1 style="
            margin:0 0 16px;
            color:#22c55e;
            font-size:22px;
            text-align:center;
          ">
            🎮 Новая бронь ToxicSkill
          </h1>

          <div style="margin-top:20px">
            <table style="width:100%; border-collapse:collapse; font-size:14px">
              <tr>
                <td style="padding:6px 0; opacity:.7">Клиент</td>
                <td style="padding:6px 0; text-align:right"><b>${clientName}</b></td>
              </tr>
              <tr>
                <td style="padding:6px 0; opacity:.7">Телефон</td>
                <td style="padding:6px 0; text-align:right">${clientPhone}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; opacity:.7">ПК</td>
                <td style="padding:6px 0; text-align:right"><b>${pcName}</b></td>
              </tr>
              <tr>
                <td style="padding:6px 0; opacity:.7">Дата</td>
                <td style="padding:6px 0; text-align:right">${date}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; opacity:.7">Время</td>
                <td style="padding:6px 0; text-align:right">
                  ${String(time).padStart(2, "0")}:00
                </td>
              </tr>
            </table>
          </div>

          <div style="
            margin-top:18px;
            padding:14px;
            border-radius:12px;
            background:rgba(34,197,94,.12);
          ">
            <div style="font-size:13px; opacity:.7">Пакет</div>
            <div style="font-size:16px; font-weight:600">${packageTitle}</div>
            <div style="margin-top:6px; font-size:18px; color:#22c55e">
              💰 ${price} BYN
            </div>
          </div>

          <div style="
            margin-top:20px;
            text-align:center;
            font-size:12px;
            opacity:.5;
          ">
            Заявка создана через систему бронирования ToxicSkill
          </div>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ToxicSkill Booking" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "🎮 Новая бронь в ToxicSkill",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return NextResponse.json(
      { error: "Ошибка сервера при отправке брони" },
      { status: 500 }
    );
  }
}
