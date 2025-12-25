type Props = {
  name: string;
  type: "standard" | "vip" | "console";
  onClick: () => void;
};

export default function PcCard({ name, type, onClick }: Props) {
  return (
    <div className={`pcCard ${type}`} onClick={onClick}>
      <div className="pcTopRow">
        <span className="pcName">{name}</span>
        <span className="pcDot" />
      </div>

      <div className="pcBottom">
        {type === "standard" && <span className="pcBadge">STANDARD</span>}
        {type === "vip" && <span className="pcBadge vip">VIP</span>}
        {type === "console" && <span className="pcBadge console">PS5</span>}
      </div>
    </div>
  );
}
