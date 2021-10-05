import { useState } from 'react';
import './overlay.scss';
import closeIcon from '../assets/close.svg';

export default function Overlay({ getIsOpen, isOpen, children }: any) {
  const [visible, setVisible] = useState(isOpen);

  const closeOverlay = () => {
    setVisible(visible);
    getIsOpen(false);
  };

  return (
    <div className="wrapper" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="container">
        <div className="closeIconContainer">
          <img
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            tabIndex={0}
            onClick={closeOverlay}
            className="closeIcon"
            src={closeIcon}
            alt="Close icon"
            onKeyPress={closeOverlay}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
