type Props = {
  open: boolean;
  login: string;
  onContinue: () => void;
};

export default function AfterRegisterModal({
  open,
  login,
  onContinue,
}: Props) {
  if (!open) return null;

  return (
    <div className="modalOverlay">
      <div className="modalCard">
        <h2>Регистрация завершена</h2>

        <div className="modalContent">
          <p>
            Вы успешно зарегистрировались!
          </p>

          <p>
            Ваш логин для входа в систему:
            <br />
            <b style={{ fontSize: "18px" }}>{login}</b>
          </p>

          <p>
            Пожалуйста, подойдите к администратору
            для подтверждения и оплаты.
          </p>

          <p style={{ opacity: 0.8 }}>
            ⚠️ Если во время регистрации был включён VPN,
            уведомление могло не прийти.
            В таком случае просто сообщите администратору.
          </p>
        </div>

        <button className="modalClose" onClick={onContinue}>
          Перейти к выбору ПК
        </button>
      </div>
    </div>
  );
}
