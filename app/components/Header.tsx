import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/pcs" className="logoButton">
        ToxicSkill
      </Link>
    </header>
  );
}
