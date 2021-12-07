import React from 'react';
import './BlockSubTitle.scss';
import up from '../assets/arrow-up-solid.svg';
import down from '../assets/arrow-down-solid.svg';

interface IBlockSubTitle {
  title: string;
  position: string;
  positionChangeCallback: CallableFunction;
}

export default function BlockSubTitle({
  title,
  position,
  positionChangeCallback,
}: IBlockSubTitle) {
  return (
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
      </div>
    </div>
  );
}
