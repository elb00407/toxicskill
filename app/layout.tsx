import "./globals.css";

export const metadata = {
  title: "ToxicSkill Gaming Club",
  description: "Computer Gaming Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <header className="header">
          <a href="/" className="brandButton">
            <span className="brandText">ToxicSkill</span>

            {/* 🎅 Дед Мороз в углу */}
            <span className="santaCorner" aria-hidden>
              🎅
            </span>
          </a>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
