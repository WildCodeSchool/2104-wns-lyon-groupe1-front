import React, { useState } from 'react';
import styles from './overlay.module.scss';
import closeIcon from '../../assets/close.svg';

export default function Overlay({ getIsOpen, isOpen, children }: any) {
  const [visible, setVisible] = useState(isOpen);

  const closeOverlay = () => {
    setVisible(visible);
    getIsOpen(false);
  };

  return (
    <div
      className={styles.wrapper}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className={styles.container}>
        <div className={styles.closeIconContainer}>
          <img
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            tabIndex={0}
            onClick={closeOverlay}
            className={styles.closeIcon}
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
