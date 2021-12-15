import './BlockSubTitle.scss';
import { useState } from 'react';
import up from '../assets/arrow-up-solid.svg';
import down from '../assets/arrow-down-solid.svg';
import pencil from '../assets/pencil.svg';
import OverLay from './OverLay';

interface IBlockSubTitle {
  title: string;
  position: string;
  positionChangeCallback: CallableFunction;
  modifyTitleCallback: any;
}

export default function BlockSubTitle({
  title,
  position,
  positionChangeCallback,
  modifyTitleCallback,
}: IBlockSubTitle) {
  const [modal, openModal] = useState(false);
  return (
    <div className="b-subtitle">
      <OverLay getIsOpen={openModal} isOpen={modal}>
        <input
          id="new-sous-titre"
          type="textarea"
          className="flashcardInput flashcardInput-grey"
          name="soustitre"
          placeholder={title}
        />
        <button
          type="button"
          className="buttons"
          onClick={() => modifyTitleCallback(title, position)}
        >
          Ajouter
        </button>
      </OverLay>
      <div className="single-subtitle block-header">
        <p>{title}</p>
        <div className="positions-img">
          <img
            data-position={position}
            src={down}
            alt="Descendre le sous-titre"
            className="downward-button"
            onClick={() => positionChangeCallback(position, 'downward')}
            aria-hidden="true"
          />
          <img
            data-position={position}
            src={up}
            alt="Monter le sous-titre"
            className="upward-button"
            onClick={() => positionChangeCallback(position, 'upward')}
            aria-hidden="true"
          />
          <button onClick={() => openModal(!modal)} type="button">
            <img src={pencil} alt="modifier mot de passe" />
          </button>
        </div>
      </div>
    </div>
  );
}
