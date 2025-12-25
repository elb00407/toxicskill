type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RulesModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <h2>Правила клуба ToxicSkill</h2>

        <div className="modalContent">
          <p>1. Соблюдайте порядок и уважайте других гостей.</p>
          <p>2. Запрещено использование стороннего ПО.</p>
          <p>3. Ночная бронь доступна только 18+.</p>
          <p>4. Администрация вправе отказать в обслуживании.</p>
          <p>5. Оплата производится перед началом сеанса.</p>
        </div>

        <button onClick={onClose} className="modalClose">
          Понятно
        </button>
      </div>
    </div>
  );
}
