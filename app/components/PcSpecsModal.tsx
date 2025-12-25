type Props = {
  open: boolean;
  pcType: "standard" | "vip" | "console";
  onClose: () => void;
};

export default function PcSpecsModal({ open, pcType, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <h2>Характеристики</h2>

        {pcType === "standard" && (
          <ul className="specsList">
            <li><b>Видеокарта:</b> RTX 3060 Ti / 4060</li>
            <li><b>Процессор:</b> Ryzen 5 5500</li>
            <li><b>ОЗУ:</b> 16 GB</li>
            <li><b>Монитор:</b> ASUS TUF 280 Hz</li>
            <li><b>Мышь:</b> HyperX Pulsefire Core</li>
            <li><b>Клавиатура:</b> HyperX Alloy Origins Core</li>
            <li><b>Наушники:</b> HyperX Cloud II</li>
          </ul>
        )}

        {pcType === "vip" && (
          <ul className="specsList">
            <li><b>Видеокарта:</b> RTX 5060 Ti</li>
            <li><b>Процессор:</b> Intel i5-13400F</li>
            <li><b>ОЗУ:</b> 32 GB</li>
            <li><b>Монитор:</b> ASUS TUF 280 Hz</li>
            <li><b>Мышь:</b> HyperX Pulsefire Haste 2</li>
            <li><b>Клавиатура:</b> Aula F75</li>
            <li><b>Наушники:</b> HyperX Cloud II</li>
          </ul>
        )}

        {pcType === "console" && (
          <ul className="specsList">
            <li><b>Консоль:</b> PlayStation 5</li>
            <li><b>TV:</b> Большой экран</li>
          </ul>
        )}

        <button className="modalClose" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
