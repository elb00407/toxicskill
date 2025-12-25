import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, surname, phone, birthDate, rulesAccepted } =
      await req.json();

    if (!name || !surname || !phone || !birthDate || !rulesAccepted) {
      return NextResponse.json(
        { error: "Некорректные данные" },
        { status: 400 }
      );
    }

    // 🔐 Генерация логина
    const phoneDigits = phone.replace(/\D/g, "").slice(-4);
    const login =
      phoneDigits +
      name[0].toUpperCase() +
      surname[0].toUpperCase();

    const registeredAt = new Date().toLocaleString("ru-RU");

    // 📧 Отправка письма админу
    if (
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.ADMIN_EMAIL
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"ToxicSkill" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "🟢 Новая регистрация в ToxicSkill",
          html: `
            <div style="
              font-family: Arial, sans-serif;
              background:#0b1220;
              color:#ffffff;
              padding:20px;
              border-radius:12px;
            ">
              <h2 style="margin-top:0;color:#22c55e;">
                Новая регистрация
              </h2>

              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;opacity:0.7;">Имя</td>
                  <td style="padding:8px 0;"><b>${name} ${surname}</b></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;opacity:0.7;">Телефон</td>
                  <td style="padding:8px 0;"><b>${phone}</b></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;opacity:0.7;">Логин</td>
                  <td style="padding:8px 0;">
                    <b style="font-size:16px;color:#22c55e;">
                      ${login}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;opacity:0.7;">Дата рождения</td>
                  <td style="padding:8px 0;"><b>${birthDate}</b></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;opacity:0.7;">Регистрация</td>
                  <td style="padding:8px 0;"><b>${registeredAt}</b></td>
                </tr>
              </table>

              <hr style="margin:20px 0;border:0;border-top:1px solid #1f2937;" />

              <p style="font-size:13px;opacity:0.7;">
                ⚠️ Если пользователь регистрировался с включённым VPN,
                уведомление могло быть задержано.
              </p>
            </div>
          `,
        });
      } catch (e) {
        console.error("EMAIL ERROR:", e);
      }
    }

    return NextResponse.json({
      success: true,
      login,
    });
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
