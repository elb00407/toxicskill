type Props = {
  open: boolean;
  onSelect: (date: string) => void;
  onClose: () => void;
};

export default function BirthDateModal({ open, onSelect, onClose }: Props) {
  if (!open) return null;

  const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 10 - i);
  const months = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
  ];

  function selectDate(y: number, m: number, d: number) {
    const date = `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    onSelect(date);
    onClose();
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={e => e.stopPropagation()}>
        <h2>Дата рождения</h2>

        <div className="birthPicker">
          {years.slice(0, 5).map(y => (
            <div key={y} className="birthYear">
              <strong>{y}</strong>
              <div className="birthDays">
                {Array.from({ length: 31 }).map((_, d) => (
                  <button
                    key={d}
                    onClick={() => selectDate(y, 1, d + 1)}
                  >
                    {d + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="modalClose" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
