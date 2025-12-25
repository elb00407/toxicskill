"use client";

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
        <h2>Регистрация успешна 🎉</h2>

        <p className="successText">
          Вы успешно зарегистрировались в <b>ToxicSkill</b>.
        </p>

        <div className="loginBox">
          <span>Ваш логин:</span>
          <b>{login}</b>
        </div>

        <p className="hintText">
          Подойдите к администратору и сообщите этот логин для входа в систему.
        </p>

        <button className="submitButton" onClick={onContinue}>
          Перейти к выбору ПК
        </button>
      </div>
    </div>
  );
}
