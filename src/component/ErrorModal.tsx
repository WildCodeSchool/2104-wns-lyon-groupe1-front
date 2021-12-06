import React from 'react';
import './ErrorModal.scss';

interface IErrorModalProps {
  text: string;
  buttonText: string;
  isVisible: boolean;
  onConfirmCallback: CallableFunction;
}

export default function ErrorModal({
  text,
  buttonText,
  isVisible,
  onConfirmCallback,
}: IErrorModalProps) {
  return (
    <div
      className="errorModalContainer"
      style={{ display: `${isVisible ? 'block' : 'none'}` }}
    >
      <div>{text}</div>
      <div>
        <button
          onClick={() => onConfirmCallback()}
          className="errorModalButton"
          type="button"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
